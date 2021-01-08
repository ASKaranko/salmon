import './scss/index.scss';
import 'bootstrap';
// eslint-disable-next-line no-unused-vars
import Swiper, {Navigation} from 'swiper';
Swiper.use([Navigation]);
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper-container', {
	direction: 'horizontal',
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	spaceBetween: 30,
	slidesPerView: 1,
	centeredSlides: true,
	centeredSlidesBounds: true,
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		400: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		640: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		768: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
		1024: {
			slidesPerView: 5,
			spaceBetween: 30,
		},
	},

});

console.log('working');
