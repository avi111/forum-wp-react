<?php
use Google\Client;
use Google\Service\Sheets;

register_activation_hook( __FILE__, 'gus_activate' );
function gus_activate() {
    if ( ! wp_next_scheduled( 'gus_cron_sync' ) ) {
        wp_schedule_event( time(), 'hourly', 'gus_cron_sync' ); // או interval מותאם
    }
}

register_deactivation_hook( __FILE__, 'gus_deactivate' );
function gus_deactivate() {
    $timestamp = wp_next_scheduled( 'gus_cron_sync' );
    if ( $timestamp ) {
        wp_unschedule_event( $timestamp, 'gus_cron_sync' );
    }
}

add_action( 'gus_cron_sync', 'gus_sync_from_sheet' );

function gus_get_sheet_rows() {
    $client = new Client();
    $client->setApplicationName('WP GSheet User Sync');
    $client->setScopes([Sheets::SPREADSHEETS_READONLY]);
    $client->setAuthConfig(__DIR__ . '/credentials.json'); // קובץ service account
    $service = new Sheets($client);

    $spreadsheetId = '1iY9VHvMYo3m4rguvX-7D6GfnUauR42-JQl1wKDJFimI';
    $range = 'Sheet1!A:O'; // להתאים לשמות העמודות שלך
    $response = $service->spreadsheets_values->get($spreadsheetId, $range);
    $values = $response->getValues();

    return $values ?: [];
}

function gus_sync_from_sheet() {
    $rows = gus_get_sheet_rows();
    if ( empty( $rows ) ) {
        return;
    }

    $last_index = (int) get_option( 'gus_last_row_index', 0 );
    foreach ( $rows as $index => $row ) {
        $current_row_number = $index + 2; // אם A2 היא השורה הראשונה לנתונים
        if ( $current_row_number <= $last_index ) {
            continue;
        }

        // כאן יוצרים משתמש חדש מהשורה
        gus_create_user_from_row( $row );

        $last_index = $current_row_number;
    }

    update_option( 'gus_last_row_index', $last_index );
}

function gus_create_user_from_row( $row ) {
    // מיפוי העמודות לפי הסדר שצוין:
    // 0: Timestamp
    // 1: שם משתמש מבוקש
    // 2: כתובת דוא׳׳ל
    // 3: שם פרטי
    // 4: שם משפחה
    // 5: מספר טלפון נייד
    // 6: מין
    // 7: תואר
    // 8: מוסד אקדמי / מכון מחקר
    // 9: פקולטה / חוג
    // 10: תת התמחות
    // 11: מסמך אימות זהות (URL)
    // 12: אישור תקנון
    // 13: אישור דיוור
    // 14: Email address (כפילות?)

    $username = sanitize_user( $row[1] ?? '' );
    $email    = sanitize_email( $row[2] ?? '' );

    if ( empty( $username ) || empty( $email ) ) {
        return;
    }

    if ( username_exists( $username ) || email_exists( $email ) ) {
        return;
    }

    // יצירת סיסמה אקראית
    $password = wp_generate_password( 12, true );

    // המרת ערכים במידת הצורך (למשל מגדר)
    $gender_raw = $row[6] ?? '';
    $gender = '';
    if ( $gender_raw === 'זכר' ) {
        $gender = 'male';
    } elseif ( $gender_raw === 'נקבה' ) {
        $gender = 'female';
    } else {
        $gender = 'other';
    }

    // המרת הסכמה לדיוור לבוליאני/טקסט מתאים
    $newsletter_raw = $row[13] ?? '';
    $newsletter = ( strpos( $newsletter_raw, 'כן' ) !== false ) ? 'true' : 'false';

    // הכנת המידע לפונקציה create_user_from_data
    $data = [
        'username'           => $username,
        'email'              => $email,
        'password'           => $password,
        'firstName'          => sanitize_text_field( $row[3] ?? '' ),
        'lastName'           => sanitize_text_field( $row[4] ?? '' ),
        'phone'              => sanitize_text_field( $row[5] ?? '' ),
        'gender'             => $gender,
        'title'              => sanitize_text_field( $row[7] ?? '' ),
        'institution'        => sanitize_text_field( $row[8] ?? '' ),
        'faculty'            => sanitize_text_field( $row[9] ?? '' ),
        'subSpecializations' => [ sanitize_text_field( $row[10] ?? '' ) ],
        'newsletter'         => $newsletter,
        'verificationDocUrl' => esc_url_raw( $row[11] ?? '' ),
        'idNumber'           => '', // לא קיים במיפוי
        'studentYear'        => '', // לא קיים במיפוי
        'mainSpecialization' => '', // לא קיים במיפוי
        'intentLetterUrl'    => '', // לא קיים במיפוי
    ];

    // קריאה לפונקציה (הנמצאת ב-inc/api-endpoints.php)
    if ( function_exists( 'create_user_from_data' ) ) {
        $result = create_user_from_data( $data );
        
        $admin_email = get_option('admin_email');
        $subject = '';
        $message = '';
        
        if ( is_wp_error( $result ) ) {
            $subject = 'שגיאה בסנכרון משתמש מ-Google Sheets';
            $message = "אירעה שגיאה בעת ניסיון ליצור משתמש חדש מהסנכרון האוטומטי.\n\n";
            $message .= "שגיאה: " . $result->get_error_message() . "\n\n";
            $message .= "פרטי המשתמש שניסו להוסיף:\n";
            $message .= print_r( $data, true );
        } else {
            $subject = 'משתמש חדש נוצר בהצלחה מ-Google Sheets';
            $message = "משתמש חדש נוצר בהצלחה מהסנכרון האוטומטי.\n\n";
            $message .= "מזהה משתמש: " . $result . "\n";
            $message .= "שם משתמש: " . $data['username'] . "\n";
            $message .= "אימייל: " . $data['email'] . "\n\n";
            $message .= "פרטי המשתמש המלאים:\n";
            $message .= print_r( $data, true );
        }
        
        wp_mail( $admin_email, $subject, $message );
    }
}
