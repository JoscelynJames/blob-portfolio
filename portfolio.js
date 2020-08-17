const defaultValueA = 'M443.187 336.146C443.187 442.897 387.942 591.537 278.619 591.537C169.295 591.537 47.2916 442.897 47.2916 336.146C47.2916 229.395 135.916 142.856 245.239 142.856C354.563 142.856 443.187 229.395 443.187 336.146Z';
const defaultValueB = 'M492.868 310.529C466.475 420.759 398.81 496.833 289.486 496.833C180.163 496.833 14.6884 392.44 14.6884 285.689C14.6884 178.938 180.163 52.8091 289.486 52.8091C511.498 26.4161 519.258 200.31 492.868 310.529Z';
const defaultValueC = 'M429.214 302.767C402.821 412.996 373.969 479.755 264.646 479.755C155.322 479.755 47.2916 409.518 47.2916 302.767C47.2916 196.016 104.089 3.12821 213.412 3.12821C435.424 -23.2648 455.605 192.547 429.214 302.767Z';
const defaultValueD = 'M423.004 405.233C396.611 515.463 316.526 517.016 207.202 517.016C97.8788 517.016 0.715698 409.518 0.715698 302.767C0.715698 196.016 66.8282 51.2566 176.152 51.2566C398.163 24.8636 449.394 295.014 423.004 405.233Z';
const defaultMouseOverValue = 'M414.913 300.715C414.913 389.031 335.44 475.097 242.438 475.097C149.436 475.097 53.3869 389.031 53.3869 300.715C53.3869 212.399 149.436 140.804 242.438 140.804C335.44 140.804 414.913 212.399 414.913 300.715Z';

const buttonA = "M116.63 57.9586C116.63 89.9683 75.311 129.906 48.5562 129.906C21.8014 129.906 0.112305 89.9683 0.112305 57.9586C0.112305 25.949 21.8014 0 48.5562 0C75.311 0 116.63 25.949 116.63 57.9586Z"
const buttonB = "M141.214 67.5592C141.214 95.3785 117.79 117.93 88.8948 117.93C59.9996 117.93 0.376099 95.3785 0.376099 67.5592C0.376099 39.74 59.9996 0.867566 88.8948 0.867566C117.79 0.867566 141.214 39.74 141.214 67.5592Z"
const buttonC = "M154.597 78.4308C154.597 108.546 108.827 109.278 79.0023 109.278C49.1777 109.278 0.718628 80.5677 0.718628 50.4529C0.718628 20.3381 49.1777 0.222656 79.0023 0.222656C108.827 0.222656 154.597 48.316 154.597 78.4308Z"
const buttonD = "M125 60.3824C125 93.381 106.313 115.606 83.2605 115.606C60.2084 115.606 0.388916 93.381 0.388916 60.3824C0.388916 27.3837 60.2084 0.633057 83.2605 0.633057C106.313 0.633057 125 27.3837 125 60.3824Z"

// Blob animations done with anime js
class BlobAnimation {
	/** target: string -  pseudo selector you want to animate
	 *	ie: .my-svg-path
	 * 	values: array of strings - 4 path values to morph to
	 *	ie: array of d values that a path will morph to
	 *			note - the last value should point back to the value hardcoded in the html
	 **/
	constructor(selector, duration, morphValues) {
		this.selector = selector;
		this.duration = duration;
    this.blobTarget = document.querySelector('.big-blob')

		this.setSvgMorphValues(morphValues);
		this.setEventListeners();
		this.setAnimation();
	}

	selector = '';
	target = '';
	duration = 20000;
	animation = {};
	valueA = defaultValueA;
	valueB = defaultValueB;
	valueC = defaultValueC;
	valueD = defaultValueD;

	setSvgMorphValues(valueArray = []) {
		if (valueArray && valueArray.length !== 0) {
      if (valueArray.length !== 4) {
        throw Error(`Error in setSvgMorphValues: value array needs to have length of 4`)
      }

			this.valueA = valueArray[0];
			this.valueB = valueArray[1];
			this.valueC = valueArray[2];
			this.valueD = valueArray[3];
		} 
	};

	setAnimation() {
		this.animation = anime({
			targets: this.blobTarget,
			d: [
				{ value: this.valueB },
				{ value: this.valueC },
				{ value: this.valueD },
				{ value: this.valueA }
			],
			easing: 'linear',
			duration: this.duration,
			loop: true
    });
	};

	setEventListeners() {
		this.blobTarget.addEventListener('mouseover', this.mouseOver.bind(this));
		this.blobTarget.addEventListener('mouseout', this.mouseOut.bind(this));
	};

	mouseOver() {
		this.animation.reverse();
	};

	mouseOut() {
		this.animation.reverse();
	};
}

class ButtonAnimation {
	animationSelector = '';
	index = 0;
	blobTarget = {};
	buttonTarget = {};
	pulseTarget = {};

	constructor(animationSelector, buttonSelector, pulseSelector) {
		this.animationSelector = animationSelector;

		this.blobTarget = document.querySelector(animationSelector)
		this.buttonTarget = document.querySelector(buttonSelector)
		this.pulseTarget = document.querySelectorAll(pulseSelector)

		this.setMouseEvents();
	}

	setMouseEvents() {
		this.buttonTarget.addEventListener('mouseover', this.handleMouseOver.bind(this))
		this.buttonTarget.addEventListener('mouseout', this.handleMouseOut.bind(this))
		this.buttonTarget.addEventListener('mousedown', this.handleMouseDown.bind(this))
		this.buttonTarget.addEventListener('mouseup', this.handleMouseUp.bind(this))
	}

	handleMouseOver() {
		anime({
			targets: this.pulseTarget,
			easing: 'easeOutQuart',
			scale: 1.1,
			duration: 75,
		})
	}

	handleMouseOut() {
		anime({
			targets: this.pulseTarget,
			scale: 1,
			duration: 75,
		})
	}

	handleMouseDown() {
		anime({
			targets: [this.blobTarget, ...this.pulseTarget],
			easing: 'easeInBounce',
			scale: .9,
			duration: 75
		})
	}

	handleMouseUp() {
		anime({
			targets: [this.blobTarget],
			easing: 'easeOutBounce',
			scale: 1,
			duration: 500
		})
		anime({
			targets: this.pulseTarget,
			easing: 'easeOutBounce',
			scale: 1.1,
			duration: 600
		})
	}
}

window.onload = function() {
  new BlobAnimation('.big-blob', 35000);
  new ButtonAnimation('.animate-button-a', '.button-a', '.outer-ring, .inner-box' );
  new ButtonAnimation('.animate-button-b', '.button-b', '#github-icon');
  new ButtonAnimation('.animate-button-c', '.button-c', '#linkedin-icon');
  new ButtonAnimation('.animate-button-d', '.button-d', '#medium-icon');
}
