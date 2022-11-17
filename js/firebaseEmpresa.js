/*==========================================================*/
/* Firebase contact form
/*==========================================================*/

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiXljn-bWAHmMb0UpBMfIfYy2EOc47i-w",
    authDomain: "contact-form-mudes.firebaseapp.com",
    databaseURL: "https://contact-form-mudes-default-rtdb.firebaseio.com",
    projectId: "contact-form-mudes",
    storageBucket: "contact-form-mudes.appspot.com",
    messagingSenderId: "436352515352",
    appId: "1:436352515352:web:4c1a17a2d21a5d530eb26d"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Refernece contactInfo collections
const db = firebase.firestore();

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
	e.preventDefault();
  //   Get input Values
	let name = document.querySelector(".name").value;
	let lastName = document.querySelector(".last-name").value;
	let email = document.querySelector(".email").value;
	let empresa = document.querySelector(".empresa").value;
	let message = document.querySelector(".message").value;
	let date = Date.now();

	const contactObj = new Contact();
	contactObj.add(name, lastName, email, empresa, message, date);

	// reset the form
	document.querySelector(".contact-form").reset();
	// // enable alert
	document.querySelector(".alert").style.display = 'block';
	// // remove alert
	setTimeout(() => {
		document.querySelector(".alert").style.display = 'none';
	},2000);
}

// Save infos to Firebase
function saveContactInfo(name, lastName, email, empresa, message) {
	let newContactInfo = contactInfo.push();

	newContactInfo.set({
    name: name,
	lastName: lastName,
    email: email,
	empresa: empresa,
    message: message,
	date: serverTimestamp(),
	});
}

class Contact{
	contactRef = db.collection("empresaContactInfo");

	async add(name,lastName, email, empresa, message, date){
		const contact = {name, lastName, email, empresa, message, date};

		try{
			const docRef = await this.contactRef.add(contact);
			contact.id = docRef.id;
		} catch (error) {
			console.error('Error Adding Contact: ', error)
		}

		return contact;
	}
}


