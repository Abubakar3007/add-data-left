
// advance search js

const selectButton = document.querySelectorAll(".select_btn");

// all select dropdown

const selectDropdowns = document.querySelectorAll(".suggestion");

// custom button select call

const selectButtonCustom = (button) => {

	button.addEventListener("click", function (e) {
		// default button
		e.stopPropagation();
		// toggle list or select dropdown

		let dropdown = this.closest(".input_text").querySelector(".suggestion");

		removeClass(selectDropdowns, "active", dropdown.getAttribute("data-dropdown"));

		dropdown.classList.toggle("active");

		// hide all dropdown which one not have active class

		bodyClick(dropdown);


	})

};

// check if button already select from backend then add class active

const addClassOnButton = (button) => {

	let input = button.nextElementSibling;
	if (input.value != "") {
		button.classList.add("active");
	}

}

// custom select button
selectButton.forEach(button => {
	selectButtonCustom(button);
	addClassOnButton(button)
});


const checkBoxesSelectObject = {
	body_type: [],
	fuel: [],
	transmission: [],
	color: [],
};


// list page filter open and close

const listFilterButton = document.querySelectorAll("[data-button]");


const filterButton = (btn) => {

	btn.addEventListener("click", function () {
		let findFilterList = this.closest(".single_list").querySelector("[data-filter]");
		this.classList.toggle("active")
		findFilterList.classList.toggle("active");
		console.log("hii")
	})
}

if (listFilterButton) {
	listFilterButton.forEach(button => {
		filterButton(button);
	})

}


// select city filter

const selectCity = (evt, current, dataId) => {

	let dropdown = document.querySelector(`[data-input="${dataId}"]`);
	if (current.value != "") {
		dropdown.classList.add("active");
		bodyClick(dropdown);
	}
	else {
		dropdown.classList.remove("active");
	}

}

const customDropdown = (selects) => {

	// find all li of single dropdown

	// if all select dropdown have li not checkbox then
	if (!selects.classList.contains("checkboxes")) {
		let singleLi = selects.querySelectorAll("li");
		singleLi.forEach(li => {
			li.addEventListener("click", function () {

				let findParent = this.closest(".input_text");
				let { findButton, findInput } = findButtonInput(findParent);

				findButton.innerText = this.innerText;
				// hide if select value from current list
				findParent.querySelector("[data-dropdown]").classList.remove("active")
				// you can set here data id in input from li
				findInput.value = `${this.getAttribute("data-value")}`;

				// check if this input have value then add class on button other wise remove

				setValueActive(findButton, findInput)
			});
		});
	}
	// if all selects have checkboxes then add value in select
	else {

		let inputs = selects.querySelectorAll("input");
		inputs.forEach((input, idx) => {
			input.addEventListener("click", function () {

				let findParent = this.closest(".input_text");
				let dropdown = this.closest(".suggestion").getAttribute("data-dropdown");
				// current element button and input find

				let { findButton, findInput } = findButtonInput(findParent);

				if (this.checked == true) {
					checkedValue(this, findButton, findInput, true, dropdown, idx);
					setValueActive(findButton, findInput);
				}
				else {
					checkedValue(this, findButton, findInput, false, dropdown, idx);
					setValueActive(findButton, findInput);
				}
			})
		})

	}

}

// return button and input
const findButtonInput = (findParent) => {

	let findButton = findParent.querySelector(".select_btn");
	let findInput = findParent.querySelector(".input_hide");

	return { findButton: findButton, findInput: findInput };

}

// set class active if input have value

const setValueActive = (button, input) => {

	if (input.value != "") {
		button.classList.add("active");
	}

	else {
		button.classList.remove("active");
	};
}


const checkedValue = (current, button, input, condition, dropdown, idx) => {

	if (condition) {
		checkBoxesSelectObject[`${dropdown}`].push(`${current.nextElementSibling.innerText}`);

		// set array in button
		button.innerText = checkBoxesSelectObject[`${dropdown}`];

		// set array in input
		input.value = checkBoxesSelectObject[`${dropdown}`];
	}

	else {
		checkBoxesSelectObject[`${dropdown}`].splice(idx, 1);

		// set array in button
		button.innerText = checkBoxesSelectObject[`${dropdown}`];

		// set array in input
		input.value = checkBoxesSelectObject[`${dropdown}`];
		if (checkBoxesSelectObject[`${dropdown}`] <= 0) {
			button.innerText = "Choose";
		}
	}

}

// all select 

selectDropdowns.forEach(dropdown => {
	customDropdown(dropdown);
});


// all my ads edit and delete option hide and open

let editOptions = document.querySelectorAll(".obj_info");

const openEditInfo = (dropdown) => {

	// find here button and dropdown list

	let editButton = dropdown.querySelector("button");

	editButton.addEventListener("click", function (e) {
		e.stopPropagation();
		allActiveClassRemove(editOptions, "active");
		this.nextElementSibling.classList.toggle("active");
		bodyClick(this.nextElementSibling);
	})

}

editOptions.forEach(options => {
	openEditInfo(options)
});


// faq section js here

let faqButton = document.querySelectorAll(".faq_button");

let faqContent = document.querySelectorAll(".single_faq");


const faqSection = (button) => {

	button.addEventListener("click", function () {
		allActiveClassRemove(faqContent, "active");
		this.closest(".single_faq").classList.toggle("active");

	})

}

if (faqButton) {
	faqButton.forEach(button => {
		faqSection(button);
	})

}

// remove all active class here

const allActiveClassRemove = (node, classToggle) => {
	for (let i = 0; i < node.length; i++) {
		node[i].classList.remove(`${classToggle}`);
	}
}


// remove all class active

const removeClass = (node, classToggle, dataId) => {
	for (let i = 0; i < node.length; i++) {
		// check if dataId match current select then on toggle its hide

		if (node[i].getAttribute("data-dropdown") == dataId) {
			continue;
		}
		node[i].classList.remove(`${classToggle}`);
	}

}

// when click on body then current open any popup hide;

const bodyClick = (node) => {

	node.addEventListener("click", function (e) {
		e.stopPropagation();
	});

	document.querySelector("body").addEventListener("click", function () {
		node.classList.remove("active");
	});

}

// password toggle

let passwordButton = document.querySelectorAll(".password_toggle");

// password function define here
const passwordToggle = (button) => {

	button.forEach(ele => {
		ele.addEventListener("click", function () {
			// class list toggle on button
			this.classList.toggle("active");
			// find here input where password toggle
			let findInput = this.closest(".input_text").querySelector(".password");
			findInput.type = findInput.type == "password" ? "text" : "password";
		});
	});
};

// password toggle function call here

if (passwordButton) {
	passwordToggle(passwordButton);
};


// seller and dealer tab

let dataTabsButton = document.querySelector(".login_tab");

// all tab buttons;

if (dataTabsButton) {

	let dataTabs = document.querySelectorAll(`[data-tab]`);

	let buttons = dataTabsButton.querySelectorAll("button");

	buttons.forEach((button, index) => {
		loginTab(button, index);
	});

	function loginTab(button, idx) {

		button.addEventListener("click", function () {

			allActiveClassRemove(buttons, "active");

			this.classList.add("active");

			allActiveClassRemove(dataTabs, "active");

			dataTabs[idx].classList.add("active");
		});
	}
};


// open and close all popup

const openPopup = (dataId) => document.querySelector(`[data-popup="${dataId}"]`).classList.add("active");


const closePopup = (dataId) => document.querySelector(`[data-popup="${dataId}"]`).classList.remove("active");


// move popup 
const movePopup = (currentDataId, nextDataId) => {

	let currentPopup = document.querySelector(`[data-popup="${currentDataId}"]`);

	let nextPopup = document.querySelector(`[data-popup="${nextDataId}"]`);

	currentPopup.classList.remove("active");
	nextPopup.classList.add("active")
}


// show more data on object view page

const showMore = (current, dataId) => {
	document.querySelector(`[data-list=${dataId}]`).classList.toggle("active");
	current.classList.toggle("active");
}



// similar objects slider js


// similar objects slider js button

let sliderIndex = 0;

const findSliderContainer = document.querySelector('[data-slider]');
let totalSliderChild = findSliderContainer.querySelectorAll(".card");



const similarObjectSlider = (num, current) => {

	let cardSpaceBetween = window.innerWidth > 650 ? 24 : 12;

	let setCardShow = showCardScreen();

	let singleCardWidth = totalSliderChild[0].offsetWidth + cardSpaceBetween;
	sliderIndex = sliderIndex + num;
	if (sliderIndex < 0) {
		sliderIndex = 0;
	}

	if (sliderIndex > totalSliderChild.length - setCardShow) {
		sliderIndex = totalSliderChild.length - setCardShow;
	}
	updateSimilarSliders(sliderIndex, singleCardWidth);

	moveDots(sliderIndex);

}

// update slider when click on button

const updateSimilarSliders = (idx, cardWidth) => {

	findSliderContainer.scrollLeft = (cardWidth * idx);
}

// set dynamic dots



const setDots = () => {

	let setCardShow = showCardScreen();


	console.log(dotsContainer)

	for (let i = 0; i < (totalSliderChild.length - (setCardShow - 1)); i++) {
		let span = document.createElement("span");
		if (i == 0) {
			span.classList.add("active");
		}
		dotsContainer.appendChild(span);
	}

}

let dotsContainer = document.querySelector(".dots");

if (dotsContainer) {
	setDots();
}

// move dots

const moveDots = (idx) => {

	let findDots = dotsContainer.querySelectorAll("span");

	// remove class active form all
	findDots.forEach(dot => {
		dot.classList.remove("active");
	});

	// add classlist active which one not have classlist active

	findDots[idx].classList.add("active")

}

// set screen cards

function showCardScreen() {

	let setCardShow;

	// which screen show how many cards
	if (window.innerWidth > 900) {
		setCardShow = 3
	}
	else if (window.innerWidth <= 900 && window.innerWidth > 650) {
		setCardShow = 2;
	}
	else {
		setCardShow = 1;
	}

	return setCardShow;

}


// objects all sliders js


const ObjectsCard = document.querySelector("[data-objects='objects']");

let totalObjectCard = ObjectsCard.querySelectorAll('[data-object]');
// create dynamic object according to total objects length;

const objectSliders = {};

const createDynamicObject = (cards) => {
	// check if here one or more cards then its create objects
	if (cards.length >= 1) {
		for (var i = 1; i <= cards.length; i++) {
			objectSliders['slider' + i] = {
				index: 0,
				sliderLength: document.querySelectorAll(`[data-object="object${i}"] .obj_images img`).length,
			}

		}
	}
}


createDynamicObject(totalObjectCard);



// move slider button

const moveSlider = (num, current) => {

	// when user click slider button then find which one slider click its means find slider number

	let findSliderParent = current.closest('[data-object]').getAttribute("data-object");

	let slideNumber = findSliderNumbers(findSliderParent);

	let { sliderContainer, sliderTotalChild } = totalChildSliders(current.closest('[data-object]'));

	// by slider number find the index number from object and increase and decrease

	objectSliders[`slider${slideNumber}`]['index'] = objectSliders[`slider${slideNumber}`]['index'] + num;



	// check if index increase or decrease;

	if (objectSliders[`slider${slideNumber}`]['index'] > sliderTotalChild.length - 1) {
		objectSliders[`slider${slideNumber}`]['index'] = 0;
	}

	if (objectSliders[`slider${slideNumber}`]['index'] < 0) {
		objectSliders[`slider${slideNumber}`]['index'] = sliderTotalChild.length - 1;
	}


	changeSlide(objectSliders[`slider${slideNumber}`]['index'], sliderContainer)

	// changeSliderNumber(slideNumber, objectSliders[`slider${slideNumber}`]['index']);
	countSliderNumber(document.querySelectorAll("[data-object]")[slideNumber - 1], objectSliders[`slider${slideNumber}`]['index'], "child");


}

// find slider number

const findSliderNumbers = (node) => {
	return parseInt(node.match(/\d+/)[0]);
}

// find total child of slider

const totalChildSliders = (node) => {
	let sliderContainer = node.querySelector(".obj_images");
	let sliderTotalChild = sliderContainer.querySelectorAll("img");

	return { sliderContainer: sliderContainer, sliderTotalChild: sliderTotalChild };
};

// move slider container


const changeSlide = function (idx, container) {
	let images = container.querySelectorAll("img");
	images.forEach((slide, index) =>
		(slide.style.transform = `translateX(${100 * (index - idx)}%)`));

};


// set slider number by dynamic

const sliderNumbers = document.querySelectorAll(".obj_number span");

const countSliderNumber = (text, idx, main) => {
	if (main == "parent") {
		text.innerText = `1 / ${objectSliders[`slider${idx + 1}`]['sliderLength']}`;
	}

	else {
		let spanText = text.querySelector(".obj_number span");
		let findTotalChild = text.querySelectorAll(".obj_images img").length
		spanText.innerText = `${idx + 1} / ${findTotalChild}`;
	}

}

sliderNumbers.forEach((ele, index) => {
	countSliderNumber(ele, index, "parent");
});



// find all object slider and set initial value

const objectContainer = document.querySelectorAll(".obj_images");

objectContainer.forEach(ele => {
	changeSlide(0, ele);
})



let drop_btn = document.querySelectorAll(".drop_btn");
if (drop_btn) {
	let btn_list = document.querySelectorAll(".btn_list");
	for (var i = 0; i < drop_btn.length; i++) {
		drop_btn[i].addEventListener("click", function (e) {
			let sibling = this.nextElementSibling;
			e.stopPropagation()

			if (sibling.style.display == "block") {
				sibling.style.display = "none";
				this.classList.remove("active");
			}
			else {
				for (var i = 0; i < btn_list.length; i++) {
					btn_list[i].style.display = "none";
					drop_btn[i].className = drop_btn[i].className.replace(" active", "");
				}
				sibling.style.display = "block";
				this.classList.add("active");
				windowClick(this);
				siblingClick(sibling);

			}
		});
	}
	function siblingClick(sibling) {
		sibling.addEventListener("click", function (e) {
			e.stopPropagation();
		})
	}
	function windowClick(it) {
		document.addEventListener("click", function () {
			for (var i = 0; i < btn_list.length; i++) {
				btn_list[i].style.display = "none";
				it.classList.remove("active");
			}
		});
	}
}


let loader = document.querySelector(".loader");
let location_icon = document.querySelectorAll(".location_icon")[0];
function locationFun(e, idx) {
	let eval = e.target.value;
	let upperval = eval.toUpperCase();
	let make_tag = document.getElementById(idx);
	if (eval != "") {
		make_tag.style.display = "block";
		setListvalue(idx, e.target);
		loader.style.display = "block";
		setTimeout(showLoader, 1000);
		setTimeout(showCross, 1000)
	}
	else {
		make_tag.style.display = "none";
		location_icon.style.display = "none"
	}
}
function showCross() {
	location_icon.style.display = "block";
}
function showLoader() {
	loader.style.display = "none";
}
function setListvalue(idx, input) {
	let tag_idx = document.getElementById(idx);
	let find_li = tag_idx.querySelectorAll("li");
	for (var single_li of find_li) {
		single_li.addEventListener("click", function () {
			input.value = `${this.innerText}`;
			tag_idx.style.display = "none";
			crossClick(input, tag_idx);
		});
	}
}

function crossClick(input, tag_idx) {
	location_icon.addEventListener("click", function () {
		input.value = "";
		this.style.display = "none";
		tag_idx.style.display = "none"
	})
}


// // index page open faq
let single_link = document.querySelectorAll(".single_link");
let footer_wrap = document.querySelector(".footer_wrap");
let wrap_div = footer_wrap.querySelectorAll("div");
function clickUl(faq) {
	faq.addEventListener("click", function () {
		let this_ul = this.querySelector("ul");
		if (this_ul.style.display == "block") {
			this_ul.style.display = "none";
			this.classList.remove("active");
		}
		else {
			this_ul.style.display = "block";
			this.classList.add("active");
		}
	})
}
function clickUl2(faq) {
	faq.removeEventListener("click", function () {
		let this_ul = this.querySelector("ul");
		if (this_ul.style.display == "block") {
			this_ul.style.display = "none";
			this.classList.remove("active");
		}
		else {
			this_ul.style.display = "block";
			this.classList.add("active");
		}
	})
}


if (window.innerWidth <= 768) {
	for (var faq of single_link) {
		clickUl(faq);
	}

	for (var i = 0; i < wrap_div.length; i++) {
		if (i == 3) {
			continue;
		}
		clickUl(wrap_div[i]);
	}
}

else {
	for (var i = 0; i < wrap_div.length; i++) {
		if (i == 3) {
			continue;
		}
		clickUl2(wrap_div[i]);
	}
	for (var faq of single_link) {
		clickUl2(faq)
	}
}




// sroll up

let arrow_div = document.querySelector(".arrow_div");
if (arrow_div) {
	let arr_btn = arrow_div.querySelector("button");
	arr_btn.addEventListener("click", function () {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	})
}



// advertise after js

let varientid = document.getElementById("varient");
let vsel1 = document.getElementById("brand");
let vsel2 = document.getElementById("model");
// drive section all select input and radio
let transmission = document.getElementById("transmission");
let killowatt = document.getElementById('killowatt');
let horsepower = document.getElementById("horsepower");
let vbody = document.getElementById("vbody");
// drive all increse and decrease btn;
let gearsinput = document.getElementById("gears");
let cylinderinput = document.getElementById("cylinder");

let centemeter = document.getElementById("centemeter");
let killogram = document.getElementById("killogram");
// enviroment all select value when page loaded
let combined = document.getElementById("combined");
let consumption = document.getElementById("consumption");
let emissionclass = document.getElementById("emissionclass");
let drivespan = document.getElementById("drivespan");
let environmentspan = document.getElementById("enviromentspan");
let pricespan = document.getElementById("pricespan");
let conditionspan = document.getElementById("conditionspan");
// condition if selected val
let vtype = document.getElementById("vtype");
let paint = document.getElementById("paint");
let cherspan = document.getElementById("cherspan");
var tagh1 = document.getElementById("tagh1");
var lispan1 = document.querySelector(".lispan");
let lcolor = document.querySelector('#lcolor');
let lcolor2 = document.querySelector('#lcolor2');
let designbox = document.querySelector(".design");
let furnishing = document.getElementById("Furnishing");
let lbarr = [];
let picupload = document.getElementById("picupload");
let picgride = document.getElementById("picgride");
let hiddenfor = document.getElementById("hiddenfor");
let fordiv1 = document.getElementById("fordiv1");
let picturespan = document.getElementById("picturespan");
let picupload2 = document.getElementById("picupload2");
let allcheck = document.querySelector(".allcheck");
let done = document.querySelector(".donepublish");
if (varientid && gearsinput) {
	let varient = varientid.value;
	let flag3 = parseInt(gearsinput.value);
	let flag4 = parseInt(cylinderinput.value);
	let seat = document.getElementById("seats").value;
	let doors = document.getElementById("doors").value;
	doors = parseInt(doors);
	seat = parseInt(seat);
	let llabel = lcolor.getElementsByTagName("label");
	let lin = lcolor.getElementsByTagName("input");
	let llabel2 = lcolor2.getElementsByTagName("label");
	let lin2 = lcolor2.getElementsByTagName("input");
	let designlabel = designbox.getElementsByTagName("label");
	let designinput = designbox.getElementsByTagName("input");
	let furnishinglabels = furnishing.getElementsByTagName("label");
	let allchecklabels = allcheck.getElementsByTagName("label");
	let car = {
		vehicle_data: {
			brand: vsel1.options[vsel1.selectedIndex].text,
			model: vsel2.options[vsel2.selectedIndex].text,
			varient: varient,
		},
		cherecterstics: {
			structure: vbody.options[vbody.selectedIndex].text,
			seat: seat,
			doors: doors,
			excolor: null,
			paint: '',
			design: '',
			incolor: null,
		},
		condition: {
			vehicletype: vtype.options[vtype.selectedIndex].text,
			mileage: '',
			month: '',
			year: '',
			owner: '',
			history: '',
			nonsmoking: '',
			nmonth: '',
			nyear: '',
			lmonth: '',
			lyear: '',
			bmonth: '',
			byear: '',
			lastbelt: "no accident vehicle"
		},
		drive: {
			drivetype: '',
			transmission: transmission.options[transmission.selectedIndex].text,
			performancekw: parseInt(killowatt.value),
			performancehp: parseInt(horsepower.value),
			gears: flag3,
			cylinders: flag4,
			displacement: parseInt(centemeter.value),
			crubweight: parseInt(killogram.value)
		},
		furnishing: {
			airbag: [],
			assistance: [],
			parking: [],
			extras: [],
			sizeselect: null,
			aircondition: [],
			comfort: [],
			light: [],
			security: [],
			seats: [],
			cruise: [],
			entertainment: [],
			media: [],
			locking: []
		},
		enviroment: {
			fuel: '',
			emmission: null,
			source: '',
			particulerfilter: null,
			combinedfuel: parseInt(combined.value),
			co2emmision: parseInt(consumption.value),
			otherfuel: [],
			emmisionclass: emissionclass.options[emissionclass.selectedIndex].text,
		},
		uploadimage: {
			picture: [],
		},
		description: {
			descpara: null
		},
		price: {
			offerprice: '',
			negotition: '',
			vat: '',
		},
		contact: {
			zipcode: '',
			city: '',
			countrycode: '',
			phoneprefix: '',
			phonenumber: '',
			addcontact: null
		}

	};
	function setFieldCharactersLength(field_id) {
		let fieldlength = document.getElementById(field_id).value.length;
		let characterfield = field_id + '_num';
		document.getElementById(characterfield).innerHTML = `${fieldlength} character`;
	}
	// check section id for which object store in which data

	if (drivespan.id == "drivespan") {
		allText2(
			drivespan.id,
			car.drive.drivetype,
			car.drive.transmission,
			car.drive.performancekw,
			car.drive.performancehp,
			car.drive.gears,
			car.drive.cylinders,
			car.drive.displacement,
			car.drive.crubweight)
	};
	if (environmentspan.id == "enviromentspan") {
		allText2(
			environmentspan.id,
			car.enviroment.fuel,
			car.enviroment.source,
			car.enviroment.combinedfuel,
			car.enviroment.co2emmision,
			car.enviroment.emmisionclass
		)
	};
	if (pricespan.id == "pricespan") {
		allText2(
			pricespan.id,
			car.price.offerprice,
			car.price.negotition,
			car.price.vat,
		)
	};
	if (cherspan.id == "cherspan") {
		allText2(
			cherspan.id,
			car.cherecterstics.structure,
			car.cherecterstics.seat,
			car.cherecterstics.doors,
			car.cherecterstics.excolor,
			car.cherecterstics.paint,
			car.cherecterstics.design,
			car.cherecterstics.incolor,
		)
	};
	if (conditionspan.id == "conditionspan") {
		allText2(
			conditionspan.id,
			car.condition.vehicletype,
			car.condition.mileage,
			car.condition.month,
			car.condition.year,
			car.condition.owner,
			"",
			car.condition.nonsmoking,
			car.condition.nmonth,
			car.condition.nyear,
			car.condition.lmonth,
			car.condition.lyear,
			car.condition.bmonth,
			car.condition.byear,
			car.condition.lastbelt,
		)
	};
	// furnishingspan for set all li;
	// click left side all list and reach on this list;
	function liFun(evt, idx) {
		var listdiv = document.getElementById(idx);
		listdiv.scrollIntoView({ behavior: "smooth" });
		var tabli = document.getElementsByClassName("tabli");
		for (var i = 0; i < tabli.length; i++) {
			tabli[i].className = tabli[i].className.replace(" active", "");
		}
		evt.currentTarget.classList += " active";
	}
	// if already paint checkbox checked when loaded
	if (paint.checked) {
		car.cherecterstics.paint = paint.value;
	}
	setFieldCharactersLength('varient');
	// fetch the all input,label of interior design
	// if any radio already checked when page reload then store value of 
	// checked radio in object
	for (var dinput of designinput) {
		if (dinput.checked) {
			car.cherecterstics.design = dinput.value;
			cherObjFun(cherspan.id, eval, eval, eval, eval, eval, dinput, eval);
		}
	}
	// event on all label when click label
	for (var dlabel of designlabel) {
		dlabel.addEventListener("click", function () {
			// fetch all label for attribute for fetch input with label for attribute
			var dlfor = this.getAttribute('for');
			var dinput = document.getElementById(dlfor);
			// checked label sibling input checked or not
			dinput.checked = true;
			// if checked true then this input or label store in object of design key
			car.cherecterstics.design = dinput.value;
			forObj(dinput, dinput.value);
			cherObjFun(cherspan.id, eval, eval, eval, eval, eval, dinput, eval);
		})
	}
	function paintFun(idx) {
		var paintinput = document.getElementById(idx);
		if (!paintinput.checked) {
			car.cherecterstics.paint = paintinput.value;
			cherObjFun(cherspan.id, eval, eval, eval, eval, paintinput, eval, eval);
			forObj(paintinput, paintinput.value);
		}
		else {
			car.cherecterstics.paint = '';
			cherObjFun(cherspan.id, eval, eval, eval, eval, '', eval, eval);
			forObj(paintinput, paintinput.value);
		}
	}
	// for relod  page alredy checked radio color
	for (var ln of lin) {
		if (ln.checked) {
			car.cherecterstics.excolor = ln.value;
			cherObjFun(cherspan.id, eval, eval, eval, ln, eval, eval, eval);
		}
	};
	for (var ln of lin2) {
		if (ln.checked) {
			car.cherecterstics.incolor = ln.value;
			cherObjFun(cherspan.id, eval, eval, eval, eval, eval, eval, ln)
		}
	};
	for (var lb of llabel) {
		lb.addEventListener("click", function () {
			let lbid = this.getAttribute('for');
			let rdo = document.getElementById(lbid);
			rdo.checked = true;
			car.cherecterstics.excolor = rdo.value;
			forObj(lbid, rdo.value);
			cherObjFun(cherspan.id, eval, eval, eval, rdo, eval, eval, eval);

		})
	};
	for (var lb of llabel2) {
		lb.addEventListener("click", function () {
			let lbid = this.getAttribute('for');
			let rdo = document.getElementById(lbid);
			rdo.checked = true;
			car.cherecterstics.incolor = rdo.value;
			forObj(lbid, rdo.value);
			cherObjFun(cherspan.id, eval, eval, eval, eval, eval, eval, rdo);
		})
	};
	// furnishing all label checker
	for (var singlelabel of furnishinglabels) {
		singlelabel.addEventListener("click", function () {
			var singlelabelattribute = this.getAttribute("for");
			var sval = this.innerText;
			var dataId = this.parentNode.parentNode.getAttribute('data-id');
			var singlefurinput = document.getElementById(singlelabelattribute);
			checkfun(dataId, singlefurinput, sval);
		})
	}
	function checkfun(datavalId, inval, svalue) {
		var num = parseInt(inval.value);
		if (inval.checked == false) {
			car.furnishing[datavalId].push(num);
			lbarr.push(svalue);
			furnishingText(lbarr, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
		}
		else {
			var index = car.furnishing[datavalId].indexOf(num);
			var full = lbarr.indexOf(svalue);
			if (index !== -1) {
				car.furnishing[datavalId].splice(index, 1);
			}
			if (index !== -1) {
				lbarr.splice(index, 1);
			}
			furnishingText(lbarr, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
		}
	}
	var h1val = tagh1.innerText = car.vehicle_data.varient;
	function allText(vale, valee, valeee) {
		var val = tagh1.innerText = ` ${vale} ${valeee}  ${valee}`;
	}
	changeLiText(vsel1.options[vsel1.selectedIndex].text, car.vehicle_data.varient, vsel2.options[vsel2.selectedIndex].text);
	allText(vsel1.options[vsel1.selectedIndex].text, h1val, vsel2.options[vsel2.selectedIndex].text);
	function forObj(idx, eval) {

		// match all select value from name for object store
		if (idx == "brand") {
			car.vehicle_data.brand = eval;
			let vehicle2 = vsel2.options[vsel2.selectedIndex] ? vsel2.options[vsel2.selectedIndex].text : "";
			allText(car.vehicle_data.brand, car.vehicle_data.varient, vehicle2);
			changeLiText(car.vehicle_data.brand, car.vehicle_data.varient, vehicle2);
		}
		else if (idx == "model") {
			car.vehicle_data.model = eval;
			allText(vsel1.options[vsel1.selectedIndex].text, car.vehicle_data.varient, car.vehicle_data.model);
			changeLiText(vsel1.options[vsel1.selectedIndex].text, car.vehicle_data.varient, car.vehicle_data.model);
		}
		if (idx == "varient") {
			car.vehicle_data.varient = eval.value;
			allText(car.vehicle_data.brand, car.vehicle_data.varient, car.vehicle_data.model);
		}
		if (idx == "vbody") {
			car.cherecterstics.structure = eval;
			allText2(cherspan.id, eval, car.cherecterstics.seat, car.cherecterstics.doors, car.cherecterstics.excolor,
				'', car.cherecterstics.design, car.cherecterstics.incolor);
		}
		if (idx == "vtype") {
			car.condition.vehicletype = eval;
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "mileage") {
			car.condition.mileage = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "month") {
			car.condition.month = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "year") {
			car.condition.year = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "nmonth") {
			car.condition.nmonth = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "nyear") {
			car.condition.nyear = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "lmonth") {
			car.condition.lmonth = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "lyear") {
			car.condition.lyear = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "bmonth") {
			car.condition.bmonth = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		if (idx == "byear") {
			car.condition.byear = parseInt(eval);
			conditionObjFun(conditionspan.id, eval);
		}
		// drive section
		if (idx == "drivetype") {
			car.drive.drivetype = eval;
			driveObjFun(drivespan.id, eval, eval, eval, eval, eval, eval, eval, eval)
		}
		if (idx == "transmission") {
			car.drive.transmission = eval;
			driveObjFun(drivespan.id, eval, eval, eval, eval, eval, eval, eval, eval)
		}
		if (idx == "killowatt") {
			car.drive.performancekw = parseInt(eval);
			driveObjFun(drivespan.id, eval, eval, eval, eval, eval, eval, eval, eval)
		}
		if (idx == "horsepower") {
			car.drive.performancehp = parseInt(eval);
			driveObjFun(drivespan.id, eval, eval, eval, eval, eval, eval, eval, eval)
		}
		if (idx == "centemeter") {
			car.drive.displacement = parseInt(eval);
			driveObjFun(drivespan.id, eval, eval, eval, eval, eval, eval, eval, eval)
		}
		if (idx == "killogram") {
			car.drive.crubweight = parseInt(eval);
			driveObjFun(drivespan.id, eval, eval, eval, eval, eval, eval, eval, eval)
		}

		// select size in furnishing section;
		if (idx == "sizeselect") {
			car.furnishing.sizeselect = parseInt(eval);
		}
		// select fuel from enviroment section
		if (idx == "fuel") {
			car.enviroment.fuel = eval;
			enObjFun(environmentspan.id, eval, eval, eval, eval);
		}
		// select source from enviroment section
		if (idx == "source") {
			car.enviroment.source = eval;
			enObjFun(environmentspan.id, eval, eval, eval, eval);
		}
		// select emissionclass from envroment section;
		if (idx == "emissionclass") {
			car.enviroment.emmisionclass = eval;
			enObjFun(environmentspan.id, eval, eval, eval, eval);
		}

		// combined input val enviroment section;
		if (idx == "combined") {
			car.enviroment.combinedfuel = eval;
			enObjFun(environmentspan.id, eval, eval, eval, eval);
		}
		// consumption input val enviroment section;

		if (idx == "consumption") {
			car.enviroment.co2emmision = eval;
			enObjFun(environmentspan.id, eval, eval, eval, eval);
		}

		// priceinput val in price section;
		if (idx == "pricein") {
			car.price.offerprice = parseInt(eval);
			priceObjFun(pricespan.id, eval, eval, eval)
		}
		if (idx == "basis") {
			priceObjFun(pricespan.id, eval, eval, eval);
		}
		if (idx == "vat") {
			car.price.vat = eval;
			priceObjFun(pricespan.id, eval, eval, eval);
		}
		// zipcode for contact section
		if (idx == "zip") {
			car.contact.zipcode = parseInt(eval);
			contactObjFun(contactspan.id, eval, eval, eval, eval, eval);
		}
		//  city code for contact section
		if (idx == "city") {
			car.contact.city = eval;
			contactObjFun(contactspan.id, eval, '', '', '', '');
		}
		// for coutry code select

		if (idx == "ccode") {
			car.contact.countrycode = parseInt(eval);
			contactObjFun(contactspan.id, eval, eval, eval, eval, eval);
		}
		// phone number fro contact section

		if (idx == "prefix") {
			car.contact.phoneprefix = parseInt(eval);
			contactObjFun(contactspan.id, eval, eval, eval, eval, eval);
		}
		if (idx == "phonenum") {
			car.contact.phonenumber = parseInt(eval);
			contactObjFun(contactspan.id, eval, eval, eval, eval, eval);
		}
		// pass all obj value set for li drive ;
		function driveObjFun(id, drivetype, transmission, performancekw, performancehp, gears, cylinders, crubweight) {
			allText2(
				drivespan.id,
				car.drive.drivetype,
				car.drive.transmission,
				car.drive.performancekw,
				car.drive.performancehp,
				car.drive.gears,
				car.drive.cylinders,
				car.drive.displacement,
				car.drive.crubweight);
		};
		// pass the all value set for li enviroment;
		function enObjFun(id, fuel, source, combinedfuel, co2emmision, emmisionclass) {
			allText2(
				environmentspan.id,
				car.enviroment.fuel,
				car.enviroment.source,
				car.enviroment.combinedfuel,
				car.enviroment.co2emmision,
				car.enviroment.emmisionclass);
		};
		// pass the all value set for li contact section;
		function contactObjFun(id, zipcode, city, countrycode, phoneprefix, phonenumber) {
			allText2(
				contactspan.id,
				car.contact.zipcode,
				car.contact.city,
				car.contact.countrycode,
				car.contact.phoneprefix,
				car.contact.phonenumber,
			);
		};
		changeLiText(car.vehicle_data.brand, car.vehicle_data.varient, car.vehicle_data.model);
	}
	// pass the all value set for li price
	function priceObjFun(id, offerprice, negotiation, vat) {
		allText2(
			pricespan.id,
			car.price.offerprice,
			car.price.negotition,
			car.price.vat,
		);
	};
	// function for pass all value set for li cherecterstices
	function cherObjFun(id, structure, seat, doors, excolor, paint, design, incolor) {
		allText2(
			cherspan.id,
			car.cherecterstics.structure,
			car.cherecterstics.seat,
			car.cherecterstics.doors,
			car.cherecterstics.excolor,
			car.cherecterstics.paint,
			car.cherecterstics.design,
			car.cherecterstics.incolor,
		);
	};

	// function pass all value set li condition;
	function conditionObjFun(id, vehicletype, mileage, month, year, owner, history, nonsmoking,
		nmonth, nyear, lmonth, lyear, bmonth, byear, lastbelt) {
		allText2(
			conditionspan.id,
			car.condition.vehicletype,
			car.condition.mileage,
			car.condition.month,
			car.condition.year,
			car.condition.owner,
			car.condition.history,
			car.condition.nonsmoking,
			car.condition.nmonth,
			car.condition.nyear,
			car.condition.lmonth,
			car.condition.lyear,
			car.condition.bmonth,
			car.condition.byear,
			car.condition.lastbelt,
		);
	};

	function changeLiText(text1, text2, text3) {
		lispan1.innerText = `${text1} ${text3} ${text2}`;
	};
	// for all select options change the value fetch by id
	function mychangeFun(idx) {
		// console.log(idx)
		var tag = document.getElementById(idx);
		var val = tag.options[tag.selectedIndex].text;
		forObj(idx, val);
		if (idx == 'brand') {
			dynamic_options(val, idx)
		}
		else if (idx == 'fuel') {
			dynamic_options(val, idx)
		}
	};
	// onkeyup any input value store or fetch from input
	function mychangeFun2(idx) {
		var tag = document.getElementById(idx);
		var tl = tag.value.length;
		let selected_text1 = vsel1.options[vsel1.selectedIndex] ? vsel1.options[vsel1.selectedIndex].text : ' ';
		let selected_text2 = vsel2.options[vsel2.selectedIndex] ? vsel2.options[vsel2.selectedIndex].text : ' ';
		setFieldCharactersLength(idx);
		forObj(idx, tag);
		allText(selected_text1, car.vehicle_data.varient, selected_text2);
		changeLiText(selected_text1, car.vehicle_data.varient, selected_text2);
	}
	// onkeyup for all input which have no length string 
	function nolenghtchangeFun(idx) {
		var tag = document.getElementById(idx).value;
		forObj(idx, tag);
	}
	// check the range of inputs
	function checkcharFun(val) {
		val.value = val.value.replace(/[^0-9]/, '') ?? 0;
	}
	// cherecterstics increse and decrease;
	var flag = seat;
	var flag2 = doors;
	// condition increse and decrease ;
	var owner = document.getElementById("owner");
	var flag5 = parseInt(owner.value);

	function minusNum(idx, num) {
		var intag = document.getElementById(idx);
		var intval = parseInt(intag.value);
		if (idx == "seats") {
			flag = flag + num;
			if (flag < 2) {
				flag = 2;
			}
			intag.value = flag;
			car.cherecterstics.seat = flag;
			cherObjFun(cherspan.id, eval, flag, doors, eval, eval, eval, eval);
		}
		if (idx == "doors") {
			flag2 = flag2 + num;
			if (flag2 <= 0) {
				flag2 = 1;
			}
			intag.value = flag2;
			car.cherecterstics.doors = flag2;
			cherObjFun(cherspan.id, eval, flag, flag2, eval, eval, eval, eval);
		}
		if (idx == "gears") {
			flag3 = flag3 + num;
			if (flag3 <= 2) {
				flag3 = 2;
			}
			intag.value = flag3;
			car.drive.gears = flag3;
			allText2(drivespan.id,
				car.drive.drivetype,
				car.drive.transmission,
				car.drive.performancekw,
				car.drive.performancehp,
				car.drive.gears,
				car.drive.cylinders,
				car.drive.displacement,
				car.drive.crubweight,
			);
		};
		if (idx == "cylinder") {
			flag4 = flag4 + num;
			if (flag4 <= 3) {
				flag4 = 3;
			};
			intag.value = flag4;
			car.drive.cylinders = flag4;
			allText2(drivespan.id,
				car.drive.drivetype,
				car.drive.transmission,
				car.drive.performancekw,
				car.drive.performancehp,
				car.drive.gears,
				car.drive.cylinders,
				car.drive.displacement,
				car.drive.crubweight,
			);
		};
		if (idx == "owner") {
			flag5 = flag5 + num;
			if (flag5 <= 0) {
				flag5 = 1
			};
			intag.value = flag5;
			car.condition.owner = flag5;
			conditionObjFun(conditionspan.id, flag5);
		};
	};
	function plusNum(idx, num) {
		var intag = document.getElementById(idx);
		var intval = parseInt(intag.value);
		if (idx == "gears") {
			flag3 = flag3 + num;
			if (flag3 >= 12) {
				flag3 = 12;
			};
			intag.value = flag3;
			car.drive.gears = flag3;
			allText2(drivespan.id,
				car.drive.drivetype,
				car.drive.transmission,
				car.drive.performancekw,
				car.drive.performancehp,
				car.drive.gears,
				car.drive.cylinders,
				car.drive.displacement,
				car.drive.crubweight
			);
		};
		if (idx == "cylinder") {
			flag4 = flag4 + num;
			if (flag4 >= 16) {
				flag4 = 16;
			};
			intag.value = flag4;
			car.drive.cylinders = flag4;
			allText2(drivespan.id,
				car.drive.drivetype,
				car.drive.transmission,
				car.drive.performancekw,
				car.drive.performancehp,
				car.drive.gears,
				car.drive.cylinders,
				car.drive.displacement,
				car.drive.crubweight
			);
		};
		if (idx == "seats") {
			flag = flag + num;
			if (flag >= 12) {
				flag = 12;
			};
			intag.value = flag;
			car.cherecterstics.seat = flag;
			cherObjFun(cherspan.id, eval, flag, doors, eval, eval, eval, eval);
		};
		if (idx == "doors") {
			flag2 = flag2 + num;
			if (flag2 >= 10) {
				flag2 = 10;
			};
			intag.value = flag2;
			car.cherecterstics.doors = flag2;
			cherObjFun(cherspan.id, eval, flag, flag2, eval, eval, eval, eval);
		};
		if (idx == "owner") {
			flag5 = flag5 + num;
			if (flag5 >= 5) {
				flag5 = 5
			};
			intag.value = flag5;
			car.condition.owner = flag5;
			conditionObjFun(conditionspan.id, flag5);
		};
	};
	// condition all label and input
	function conditonLabelFun(idx) {
		var cinput = document.getElementById(idx);
		if (cinput.checked == false) {
			var cinputval = cinput.value;
			if (idx == 'checkbook') {
				car.condition.history = cinputval;
				conditionObjFun(conditionspan.id, cinputval)
			};
			if (idx == 'nonsmoking') {
				car.condition.nonsmoking = cinputval;
				conditionObjFun(conditionspan.id, cinputval)
			};
			if (idx == 'accident') {
				car.condition.lastbelt = cinputval;
				conditionObjFun(conditionspan.id, cinputval)
			};
			if (idx == 'filter') {
				car.enviroment.particulerfilter = parseInt(cinputval);
			};
			if (idx == 'basis') {
				car.price.negotition = (cinputval);
				forObj(idx, cinputval);
				priceObjFun(pricespan.id, eval, cinputval, cinputval)
			};
			if (idx == 'vat') {
				car.price.vat = (cinputval);
				forObj(idx, cinputval);
				priceObjFun(pricespan.id, eval, cinputval, cinputval)
			};
		}
		else {
			if (idx == 'checkbook') {
				car.condition.history = "";
				conditionObjFun(conditionspan.id, "")
			};
			if (idx == 'nonsmoking') {
				car.condition.nonsmoking = "";
				conditionObjFun(conditionspan.id, cinputval)
			};
			if (idx == 'accident') {
				car.condition.lastbelt = "no accident vehicle";
				conditionObjFun(conditionspan.id, cinputval)
			};
			if (idx == 'basis') {
				car.price.negotition = "";
				priceObjFun(pricespan.id, eval, " ", "");
			};
			if (idx == 'vat') {
				car.price.vat = "";
				priceObjFun(pricespan.id, eval, " ", " ");
			};
		};
	};
	// checkradio of enviroment section;
	for (var singlelabel of allchecklabels) {
		singlelabel.addEventListener("click", function () {
			var att = this.getAttribute('for');
			var inputatt = document.getElementById(att);
			if (inputatt.checked == false) {
				car.enviroment.emmission = parseInt(inputatt.value);
			};
		});
	};
	function allText2(id, text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11, text12, text13, text14) {
		if (id == "cherspan") {
			document.getElementById("cherspan").innerText = `${text1}, ${text2} seats, ${text3} doors, ${text4}, ${text5} ${text6}, ${text7}`;
		};
		if (id == "conditionspan") {
			document.getElementById("conditionspan").innerText = `${text1} ${text2} ${text3} ${text4} ${text5} ${text6} ${text7} ${text8} ${text9} ${text10} ${text11} ${text12} ${text13} ${text14}`
		};
		if (id == "drivespan")
			document.getElementById("drivespan").innerText = `${text1} ${text2}, ${text3}kw (${text4} hp), ${text5} gears, ${text6} cylinders, ${text7} cm3 ${text8} kg`;

		if (id == "enviromentspan")
			document.getElementById("enviromentspan").innerText = `${text1} ${text2}  ${text3} l/100 km, ${text4} g/km , ${text5}`;
		if (id == "pricespan") {
			document.getElementById("pricespan").innerText = `${text1}€  ${text2}  ${text3}`;
		};
		if (id == "contactspan") {
			document.getElementById("contactspan").innerText = `${text1} ${text2} ${text3} ${text4} ${text5}`
		};
	};

	function furnishingText(arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12, arr13, arr14, arr15) {
		let furnishingspan = document.getElementById("furnishingspan");
		furnishingspan.innerText = `${arr1} ${arr2} ${arr3} ${arr4} ${arr5} ${arr6} ${arr7} ${arr8} ${arr9} ${arr10} ${arr11} ${arr12} ${arr13} ${arr14} ${arr15}`
	};
	// file upload js here-->
	picupload.addEventListener("change", () => {
		if (picupload.files.length > 0) {
			const file = picupload.files[0];
			picimg.src = URL.createObjectURL(file);
			picimg.alt = file.name;
			car.uploadimage.picture.push(file.name);
			picturespan.innerText = `${1} picturee`;
			picgride.style.display = "flex";
			hiddenfor.style.display = "none";
		};
	});

	function deleteFun2(val, picname) {
		var valper = val.parentNode;
		valper.style.display = "none";
		let picid = document.getElementById(picname).alt;
		var index = car.uploadimage.picture.indexOf(picid);
		if (index != -1) {
			car.uploadimage.picture.splice(picid);
		};
	};
	var idxval = 2;
	picupload2.addEventListener("change", function () {
		if (picupload2.files.length > 0) {
			const fil = picupload2.files[0];
			var html = `
       <div class="singlepic">
        <img src="${URL.createObjectURL(fil)}" alt="${fil.name}" id=img${idxval}>
        <span onclick="deleteFunction(this,'${fil.name}'),-1" id=sp${idxval}><i class='bx bx-trash'></i></span>
      </div> `;
			fordiv1.innerHTML += html;
			picturespan.innerText = `${idxval} picture`;
			car.uploadimage.picture.push(fil.name);
			idxval++;
		};
	});
	function deleteFunction(val, pathimg, num) {
		var imgval = val.parentNode;
		fordiv1.removeChild(imgval);
		var index = car.uploadimage.picture.indexOf(pathimg);
		if (index != -1) {
			car.uploadimage.picture.splice(index, 1);
			picturespan.innerText = `${car.uploadimage.picture.length} picture`;
		};
	};
	function publishFun(e, str) {
		e.preventDefault();
		done.style.display = "flex";
		setTimeout(() => {
			done.style.display = "none";
			// window.location.href = "/mysaveads.html";
		}, 4000);
		sendData(str)
	};
};


let cards_car1 = document.getElementById("cards_car1");
let cards_car2 = document.getElementById("cards_car2");
if (cards_car1 && cards_car2) {
	let card = cards_car1.querySelectorAll(".single_car");
	let card2 = cards_car2.querySelectorAll(".single_car");
	function pageLoaded() {

		for (var i = 0; i < card.length; i++) {
			if (i >= 3) {
				card[i].style.display = "none";
			}
		}
		for (var i = 0; i < card2.length; i++) {
			if (i >= 3) {
				card2[i].style.display = "none";
			}
		}
	}
	window.onload = pageLoaded;
}


// cards show length
function clickMoreCar(idx) {
	let find_tag = document.getElementById(idx);
	let card_innr = find_tag.querySelectorAll(".single_car");
	for (var i = 0; i < card_innr.length; i++) {
		card_innr[i].style.display = "block"
	}
}

let whitlist = document.querySelector(".whitlist");
if (whitlist) {
	window.onscroll = function () { scrollFunction() };
	function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			whitlist.classList.add("active")
		} else {
			whitlist.classList.remove("active");
		}
	}
	setTimeout(hideWhitlist, 4000)
	function hideWhitlist() {
		whitlist.style.display = "none"
	}
}




// accordian button
let ac_btn = document.querySelectorAll(".ac_btn");
for (var single_btn of ac_btn) {
	single_btn.addEventListener("click", btnClickFun)
}
function btnClickFun() {
	let find_sibling = this.nextElementSibling;
	if (find_sibling.style.display == "block") {
		find_sibling.style.display = "none";
		this.classList.remove("active");
	}
	else {
		find_sibling.style.display = "block";
		this.classList.add("active")
	}
}


let inner_ad_list = document.querySelector(".inner_ad_list");
let hit_input = document.querySelectorAll(".hit_input");
for (var single_input of hit_input) {
	single_input.addEventListener("click", function (e) {
		e.stopPropagation();
		let val = e.target;
		let inputId = this.id;
		let get_node = this.parentNode;
		let find_div = get_node.querySelector("div");
		find_div.style.display = "block";
		if (find_div.style.display == "block") {
			document.addEventListener("click", function () {
				find_div.style.display = "none"
			})
		}
		hitAnyLi(find_div, val, inputId);
	})
}
function hitAnyLi(prnode, val, inputId) {
	let all_li = prnode.querySelectorAll("li");
	for (var single_li of all_li) {
		single_li.addEventListener("click", function () {
			let send_text = this.innerText;
			val.value = `${this.innerText}`;
			prnode.style.display = "none";
			setObjectInsideValue(inputId, val, send_text);

		})
	}
}
function setObjectInsideValue(inputId, val, send_text) {
	let find_ptr = document.getElementById(inputId);
	let check_id = find_ptr.parentNode.parentNode.id;
	if (check_id == "basic_data") {
		car.basic_data[inputId] = `${send_text}`;
	}
	else if (check_id == "furnishing") {
		car.furnishing[inputId] = `${send_text}`;
	}
	else if (check_id == "color") {
		car.color.exterior_color = ""
	}
	else if (check_id == "up_color") {
		car.color.uphostry_color = ""
	}
	else if (check_id == "condition") {
		car.vehicle_condition[inputId] = `${send_text}`
	}
	else if (check_id == "enviroment") {
		car.enviroment[inputId] = `${send_text}`
	}
	else if (check_id == "other") {
		car.other_details[inputId] = `${send_text}`;
	}

	let inputval = car.basic_data[inputId];
	let html = `
   <button> ${inputval}
        <span><i class='bx bx-plus-circle' ></i></span>
   </button>
   `;
	inner_ad_list.innerHTML += html;
}


let input_wrappper = document.querySelectorAll(".input_wrappper");
for (var single_wrapper of input_wrappper) {
	let all_input = single_wrapper.querySelector("input");
	if (all_input) {
		all_input.addEventListener("click", inputClickFun);
	}

	let all_btn = single_wrapper.querySelector("button");
	if (all_btn) {
		all_btn.addEventListener("click", buttonClickFun);
	}
}
function inputClickFun(e) {
	e.stopPropagation();
	let ptr_node = this.parentNode;
	let val_input = e.target;
	let find_sibling = ptr_node.nextElementSibling;
	if (find_sibling) {
		find_sibling.style.display = "block";
		if (find_sibling.style.display == "block") {
			document.addEventListener("click", function () {
				find_sibling.style.display = "none";
			})
		}
		showElement(find_sibling, val_input);
	}
}

function showElement(find_sibling, val_input) {
	let all_li = find_sibling.querySelectorAll("li");
	for (var single_li of all_li) {
		single_li.addEventListener("click", function () {
			val_input.value = `${this.innerText}`;
			find_sibling.style.display = "none";
		})
	}
}
function buttonClickFun(e) {
	e.stopPropagation();
	let ptr_node = this.parentNode;
	let thistext = e.target;
	let find_sibling = ptr_node.nextElementSibling;
	if (find_sibling.style.display == "block") {
		find_sibling.style.display = "none";
	}
	else {
		find_sibling.style.display = "block";
	}
	document.addEventListener("click", function () {
		find_sibling.style.display = "none";
	});

	let input_check = find_sibling.querySelectorAll("input");
	if (input_check.length > 0) {
		checkInput(e, find_sibling);
	}
	else {
		checkForLi(find_sibling, thistext);
	}
}
function checkInput(e, find_sibling) {
	find_sibling.addEventListener("click", function (e) {
		e.stopPropagation();
	})
}
function checkForLi(find_sibling, thistext) {
	let all_li = find_sibling.querySelectorAll("li");
	for (var single_li of all_li) {
		single_li.addEventListener("click", function () {
			thistext.innerText = `${this.innerText}`;
			find_sibling.style.display = "none"
		})
	}
}

let advance_button = document.querySelectorAll(".advance_button");
for (var single_btn of advance_button) {
	single_btn.addEventListener("click", function () {
		let find_sibling = this.nextElementSibling;
		if (find_sibling.style.display == "none") {
			find_sibling.style.display = "block";
			this.classList.add("active");
		}
		else {
			find_sibling.style.display = "none";
			this.classList.remove("active");
		}
	})
}


let outer = document.querySelector(".outer");
function openDivFun(btn, evt, idx) {
	evt.preventDefault();
	let tag = document.getElementById(idx);
	let outer_div = btn.parentNode.parentNode;
	outer_div.style.display = "none";
	tag.style.display = "block";
}


function backBtnFun(idx) {
	let tag = document.getElementById(idx);
	tag.style.display = "none";
	outer.style.display = "block"
}


let menu_icon = document.querySelector(".menu_icon");
const body = document.body;
if (menu_icon) {
	let responsive_navbar = document.querySelector(".responsive_navbar")
	let span1 = menu_icon.getElementsByTagName("span")[0];
	let span2 = menu_icon.getElementsByTagName("span")[1]
	span1.addEventListener("click", function () {
		responsive_navbar.style.display = "block";
		span2.style.display = "block";
		this.style.display = "none";
		body.style.overflow = "hidden"

	})
	span2.addEventListener("click", function () {
		responsive_navbar.style.display = "none";
		span1.style.display = "block";
		this.style.display = "none";
		body.style.overflow = "initial"
	})
}


// contatc form tab

function tabContactFun(evt, idx) {
	let contact_form = document.querySelectorAll(".contact_form");
	for (var single_form of contact_form) {
		single_form.style.display = "none"
	}

	let tab_btn = document.querySelectorAll(".tab_btn");
	for (var i = 0; i < tab_btn.length; i++) {
		tab_btn[i].className = tab_btn[i].className.replace(" active", "");
	}
	document.getElementById(idx).style.display = "flex";
	evt.currentTarget.className += " active";
}




// advertise sell js
function modelFun(evt, idx) {
	let directentry = document.querySelectorAll(".directentry");
	for (var single_dict of directentry) {
		single_dict.style.display = "none"
	}

	let model = document.querySelectorAll(".model");
	for (var i = 0; i < model.length; i++) {
		model[i].className = model[i].className.replace(" active", "");
	}

	document.getElementById(idx).style.display = "block";
	evt.currentTarget.className += " active";
}


// direct_sell js

function tabboxFun(evt, idx) {
	let directentry = document.querySelectorAll(".contenttabbox");
	for (var single_dict of directentry) {
		single_dict.style.display = "none";
	}

	let model = document.querySelectorAll(".singletab");
	for (var i = 0; i < model.length; i++) {
		model[i].className = model[i].className.replace(" active", "");
	}

	document.getElementById(idx).style.display = "flex";
	evt.currentTarget.className += " active";
}

let singleq = document.querySelectorAll(".singleq");
for (var single_faq of singleq) {
	single_faq.addEventListener("click", function () {
		let sibling = this.nextElementSibling;
		if (sibling.style.display == "block") {
			sibling.style.display = "none";
			this.classList.remove("active");
		}
		else {
			sibling.style.display = "block";
			this.classList.add("active");
		}
	})
}


// contact check input

let input_mail = document.querySelectorAll(".input_mail");
for (var single_input of input_mail) {
	let mail_label = single_input.querySelector("label");
	let mail_hide = document.querySelector(".mail_hide");
	mail_label.addEventListener("click", function () {
		let ptr = this.parentNode;
		let mail_hide = ptr.nextElementSibling;
		let this_at = this.getAttribute("for");
		let make_input = document.getElementById(this_at);
		if (make_input.checked != true) {
			showDisplay(mail_hide);
		}
		else {
			hideDisplay(mail_hide);
		}
	});
}


let mail_send = document.querySelector(".mail_send")
let mail_head = document.querySelector(".mail_head");
if (mail_head) {
	let mail_button = mail_head.querySelector("span");
	let send_mail = document.querySelector(".send_mail");
	mail_button.addEventListener("click", function () {
		hideDisplay(mail_send);
	});
	send_mail.addEventListener("click", function () {
		showFlex(mail_send);
	})
}


let gallery_left_top = document.querySelector(".gallery_left_top");
let fixed_gallery = document.querySelector(".fixed_gallery");
if (gallery_left_top) {
	gallery_left_top.addEventListener("click", function () {
		fixed_gallery.classList.add("active");
	});
}



let gallery_navbar = document.querySelector(".gallery_navbar");
if (gallery_navbar) {
	let cross_span = gallery_navbar.querySelector("span");
	cross_span.addEventListener("click", function () {
		fixed_gallery.classList.remove("active")
	})
}

// gallery_image js;




// Initialize a variable to keep track of the total width


// Loop through the child elements and sum up their widths



let gallery_left_bottom = document.querySelectorAll(".gallery_left_bottom");
let number_img = document.querySelector(".number_img");
if (gallery_left_bottom && number_img) {
	let number_span = number_img.querySelector("span");
	let index = 0;
	let totalWidth = 0;
	let find_next = gallery_left_bottom[0];
	let children_of = find_next.children;
	for (let i = 0; i < children_of.length; i++) {
		totalWidth += children_of[i].offsetWidth;
	}
	let g_div = document.querySelectorAll(".g_div");
	let one_div = find_next.querySelectorAll("div");
	let append_image = document.querySelector(".append_img");
	gallerySlide(index);
	function leftClick() {
		index = index - 1;
		if (index <= 0) {
			index = one_div.length - 1;
			find_next.scrollLeft = totalWidth;
			gallerySlide(index);
			number_span.innerText = `${index}_ _`;
		}
		else {
			number_span.innerText = `${index}_ _`;
			gallerySlide(index);
			find_next.scrollLeft -= 60;
		}
		g_div[index].className += " active";

	}

	function rightClick() {
		index = index + 1;
		if (index >= one_div.length) {
			index = 0;
			find_next.scrollLeft = 0;
		}
		number_span.innerText = `${index}_ _`;
		gallerySlide(index);
		find_next.scrollLeft += 60;
		g_div[index].className += " active";

	}


	function gallerySlide(index) {
		let inti = one_div[index].innerHTML;
		append_image.innerHTML = inti;
		for (var i = 0; i < g_div.length; i++) {
			g_div[i].className = g_div[i].className.replace(" active", "");
		}
	}
	g_div.forEach((button, idx) => {
		button.addEventListener("click", (e) => {
			const positionClicked = idx + 1;
			index = idx;
			gallerySlide(index);
			append_image.innerHTML = button.innerHTML;
			e.currentTarget.className += " active";
		});
	});

}



// slider of vehicle
let vehicle_width = 0;
let vechile_scroll = 0;
let vehicle_collection = document.querySelector(".vehicle_collection");
if (vehicle_collection) {
	let vehicle_offset = vehicle_collection.offsetWidth;
	function leftBtnFun(para) {
		vehicle_collection.scrollLeft -= 150;
		vechile_scroll = vechile_scroll - 150;

	}

	function rightBtnFun(para) {
		vehicle_collection.scrollLeft += 150;
		vechile_scroll = vechile_scroll + 150;

	}
}



// tab of afterdirectsell
function mydtabFun(e, idx) {
	e.preventDefault();
	let dpricecontent = document.getElementsByClassName("dpricecontent");
	for (var i = 0; i < dpricecontent.length; i++) {
		dpricecontent[i].style.display = "none";;
	}
	let dtablink = document.getElementsByClassName("dtablink");
	for (var i = 0; i < dtablink.length; i++) {
		dtablink[i].className = dtablink[i].className.replace(" active", "");
	}
	document.getElementById(idx).style.display = "block";
	e.currentTarget.className += " active";
}
function mydtabFun2(e, idx) {
	e.preventDefault();
	document.getElementById(idx).style.display = "none";
}


// advertise feedback js
function feedClick(e, cl) {
	e.preventDefault();
	let popclass = document.querySelector(`.${cl}`);
	popclass.style.display = "flex";
}
function feedCross(e, cl) {
	e.preventDefault();
	let popclass = document.querySelector(`.${cl}`);
	popclass.style.display = "none";
}

// click left side all list and reach on this list;
function liFun(evt, idx) {
	var listdiv = document.getElementById(idx);
	listdiv.scrollIntoView({ behavior: "smooth" });
	var tabli = document.getElementsByClassName("tabli");
	for (var i = 0; i < tabli.length; i++) {
		tabli[i].className = tabli[i].className.replace(" active", "");
	}
	evt.currentTarget.classList += " active";
}

// tinymc
// if (document.getElementById("editor")) {
//     document.addEventListener("DOMContentLoaded", function () {
//         const editor = tinymce.init({
//             selector: "#editor",
//             plugins: "link image code lists",
//             toolbar: "bold | bullist numlist",
//             setup: function (editor) {
//                 editor.on('keyup', function () {
//                     updateCharacterCount(editor);
//                 });
//             }
//         });
//         function updateCharacterCount(editor) {
//             const content = editor.getContent();
//             const characterCountElement = document.getElementById("descspan");
//             characterCountElement.innerHTML = content;
//         };
//     });
// }

// direct_sell js

function setvalFun(idx, tag) {
	let new_tag = document.getElementById(idx);
	if (new_tag.style.display == "block") {
		new_tag.style.display = "none";

	}
	else {
		new_tag.style.display = "block";
		let this_tag = new_tag.querySelectorAll(".thistab");
		for (var single_tag of this_tag) {
			single_tag.addEventListener("click", function () {
				tag.value = this.children[0].innerText;
				new_tag.style.display = "none"
			})
		}
	}
}

// postcode input


function postCodeFun(e, idx, idx1) {
	let eval = e.target.value;
	let post_tag = document.getElementById(idx);
	let this_input = document.getElementById(idx1);
	if (eval != "") {
		post_tag.style.display = "block";
		let li = post_tag.querySelectorAll("li");
		for (var single_li of li) {
			single_li.addEventListener("click", function () {
				this_input.value = this.innerText;
				post_tag.style.display = "none"
			})
		}
	}
	else {
		post_tag.style.display = "none"
	}
}


function showallFun() {
	let forul = document.getElementById("forul");
	if (forul.style.height == 'auto') {
		forul.style.height = "0px";
	}
	else {
		forul.style.height = 'auto';
	}
}

// scroll fixed header of afteradvertise scroll button

const header = document.querySelector('.fixedmain');
const content = document.querySelector('#rightmainid');
if (content) {
	window.onscroll = function () {
		let contenth = content.offsetHeight - 689;
		if (window.pageYOffset > contenth) {
			header.classList.add('sticky');
		} else {
			header.classList.remove('sticky');
		}
	}
}


// sharelist of objectlist
let share_btns = document.querySelectorAll(".share_btns");
for (var single_list of share_btns) {
	let single_btn = single_list.querySelectorAll("button")[1];
	single_btn.addEventListener("click", function (e) {
		e.stopPropagation();
		let sibling = this.nextElementSibling;
		if (sibling.style.display == "block") {
			hideDisplay(sibling);
		}
		else {
			showDisplay(sibling);
			document.addEventListener("click", function (e) {
				hideDisplay(sibling)
			});
			sibling.addEventListener("click", function (e) {
				e.stopPropagation();
			})
		}

	})
}


// object detail page js
let all_icons = document.querySelector(".all_icons");
if (all_icons) {
	let icons_btn = all_icons.querySelectorAll("button")[1];
	icons_btn.addEventListener("click", function (e) {
		e.stopPropagation();
		let ptrnode = this.parentNode;
		let make_div = ptrnode.querySelector(".share_popup");
		if (make_div.style.display == "block") {
			hideDisplay(make_div)
		}
		else {
			showDisplay(make_div);
			document.addEventListener("click", function () {
				hideDisplay(make_div)
			});
			make_div.addEventListener("click", function (e) {
				e.stopPropagation();
			})
		}

	})
}

// delete ads
let dlpopup = document.querySelector(".dlpopup");
if (dlpopup) {
	function deleteadsFun(e) {
		e.stopPropagation();
		dlpopup.style.display = "flex";
	}
	function deleteClose(e) {
		dlpopup.style.display = "none";
	}
	function clickFun(e) {
		e.stopPropagation();
	}
}


// mysetting js;
let hidepass = document.querySelector("#hidepass");
let hidepass1 = document.querySelector("#hidepass1");
let hidepass2 = document.querySelector("#hidepass2");
function hitpassFun(e) {
	e.preventDefault();
	hidepass.style.display = "block";
	hidepass1.style.display = "none"
}
function backFun() {
	hidepass.style.display = "none";
	hidepass1.style.display = "block";
}
function deleteFun(e) {
	e.preventDefault();
	hidepass2.style.display = "block";
	hidepass1.style.display = "none";
}
function backFun2() {
	hidepass2.style.display = "none";
	hidepass1.style.display = "block";
}
function intFun(e) {
	e.preventDefault();
	hidepass2.style.display = "none";
	hidepass1.style.display = "block";
}

// toogle the password
function toogFun(evt, idx) {
	var val = document.getElementById(idx);
	if (val.type === "password") {
		val.type = "text";
	} else {
		val.type = "password";
	}
}

// add dynamic month date and day daynamic 
let selectadd = document.getElementById("selectadd");
if (selectadd) {
	var fromtomorrow = new Date();
	fromtomorrow.setDate(fromtomorrow.getDate() + 1);
	var fivedaysahead = new Date();
	fivedaysahead.setDate(fivedaysahead.getDate() + 6);

	var appointmentselect = [];
	for (; fromtomorrow <= fivedaysahead; fromtomorrow.setDate(fromtomorrow.getDate() + 1)) {
		appointmentselect.push(new Date(fromtomorrow));
	}
	var output = '';
	for (let elem of appointmentselect) {
		let val = elem.toISOString().split('T')[0];
		let txt = elem.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" });
		selectadd.innerHTML += `<option value="${val}">${txt}</option>`;
	}
}


// smiler vehicle js

let note_last = document.querySelectorAll(".note_last a");
let similer_popup = document.querySelector(".similer_popup")
for (var i = 0; i < note_last.length; i++) {
	note_last[i].addEventListener("click", function (e) {
		e.preventDefault()
		showDisplay(similer_popup)
	})
}
let btn_vehicle = document.querySelector('.btn_vehicle span');
if (btn_vehicle) {
	btn_vehicle.addEventListener("click", function () {
		hideDisplay(similer_popup)
	})
}


// payment options js
function clickTab(evt, ths) {
	let single_mail = document.querySelectorAll(".single_mails");
	for (var i = 0; i < single_mail.length; i++) {
		single_mail[i].className = single_mail[i].className.replace(" active", "");
	}
	evt.currentTarget.className += " active";
	let find_tag = ths.querySelector(".price").innerText;
	let payment_btn = document.querySelector(".payment_btn button");
	payment_btn.innerText = `Continue with SuperPlus ( ${find_tag} )`;
}


// payment tag
function paymentTab(evt, idx) {
	let single_pay = document.querySelectorAll(".hide_box")
	for (var i = 0; i < single_pay.length; i++) {
		single_pay[i].style.display = "none";
	}

	let s_pay = document.querySelectorAll('.single_pay');
	for (var i = 0; i < s_pay.length; i++) {
		s_pay[i].className = s_pay[i].className.replace(" active", "");
	}
	document.getElementById(idx).style.display = "block";
	evt.currentTarget.className += " active"
}

function showDisplay(tag) {
	tag.style.display = "block";
}

function showFlex(tag) {
	tag.style.display = "flex";
}

function hideDisplay(tag) {
	tag.style.display = "none";
}




/* gak_js start from here */

function no_error_class(dt) {
	dt.classList.remove('error_active')
	dt.classList.add('no_error_active')
}


function error_class(dt) {
	dt.classList.add('error_active')
	dt.classList.remove('no_error_active')
}



