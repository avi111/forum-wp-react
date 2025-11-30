function addAllProductsToCart() {
    jQuery.ajax({
        url: woocommerce_params.ajax_url,
        type: 'POST',
        data: {
            action: 'ajax_update_cart_courses',
        },
        success: function() {
            window.location.href = buyAllParams.checkoutUrl;
        }
    });
}

function buyAll() {
    addAllProductsToCart();
}

