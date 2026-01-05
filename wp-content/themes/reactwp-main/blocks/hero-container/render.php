<?php
$backgroundImageUrl = $attributes['backgroundImageUrl'] ?? '';
$sideImageUrl = $attributes['sideImageUrl'] ?? '';
?>
<div class="relative bg-slate-900 text-white overflow-hidden min-h-[500px] flex items-center">
	<div class="absolute inset-0">
		<?php if ( $backgroundImageUrl ) : ?>
			<img
				src="<?php echo esc_url( $backgroundImageUrl ); ?>"
				alt="Hero Background"
				class="absolute inset-0 w-full h-full object-cover opacity-20"
			/>
		<?php endif; ?>
		<div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
	</div>
	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12">
		<div class="flex-1 text-center md:text-right space-y-8 animate-fade-in-up">
			<?php echo $content; ?>
      <div id="hero-children-placeholder"></div>
		</div>
		<?php if ( $sideImageUrl ) : ?>
			<div class="hidden md:block flex-1 relative animate-float">
				<div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
					<img
						src="<?php echo esc_url( $sideImageUrl ); ?>"
						alt="Research"
						class="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
					/>
				</div>
				<!-- Decorative elements -->
				<div class="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
				<div class="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
			</div>
		<?php endif; ?>
	</div>
</div>
