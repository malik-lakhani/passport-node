var db = require('../helpers/db.js')
var squel = require('squel');
exports.findByUser = function (email, password, provider) {
	let query = db.builder()
		.select()
		.from("users")
		.where("email = ?", email)
		.where("password = ?", password)
		.where("provider = ?", provider)
		.toParam();
	console.log(query)
	return db.executeQuery(query)
	.then((response) => {
		if (response && response.length) {
			return response[0];
		}
	})
	.catch((err) => {
      throw new Error('Error');
	});
}

exports.findById = function (id, provider) {
	let query = db.builder()
		.select()
		.from("users")
		.where("id = ?", id)
		.where("provider = ?", provider)
		.toParam();
	console.log(query)
	return db.executeQuery(query)
	.then((response) => {
		if (response && response.length) {
			return response[0];
		}
	})
	.catch((err) => {
      throw new Error('Error');
	});
}

exports.findOrCreateByGoogle = function (profile) {
	let query = db.builder()
		.select()
		.from("users")
		.where("email = ? ", profile.emails[0].value)
		.where("provider = ?", profile.provider)
		.toParam();
		console.log(query)
	return db.executeQuery(query)
	.then((response) => {
		if (response && response.length) {
			return response[0];
		} else {
			let email = profile.emails[0].value;
			let provider =  profile.provider;
			let displayName = profile.displayName;
			let query1 = db.builder()
				.insert()
				.into("users")
				.set("email", email)
				.set("provider", provider)
				.set("username", displayName)
				.returning("*")
				.toParam();
			console.log(query1);

			return db.executeQuery(query1)
			.then((response1) => {
				return response1;
			})
		}
	})
	.catch((err) => {
      throw new Error('Error');
	})
}

exports.findOrCreateByFacebook = function (profile) {
	let query = db.builder()
		.select()
		.from("users")
		.where("username = ? ", profile.displayName)
		.where("provider = ?", profile.provider)
		.toParam();
		console.log(query)
	return db.executeQuery(query)
	.then((response) => {
		if (response && response.length) {
			return response[0];
		} else {
			let displayName = profile.displayName;
			let provider =  profile.provider;
			let email = null;
			if (profile.emails && profile.emails.length) {
				email = profile.emails[0].value;
			}
			let query1 = db.builder()
				.insert()
				.into("users")
				.set("email", email)
				.set("username", displayName)
				.set("provider", provider)
				.returning("*")
				.toParam();
			console.log(query1);

			return db.executeQuery(query1)
			.then((response1) => {
				return response1;
			})
		}
	})
	.catch((err) => {
      throw new Error('Error');
	})
}