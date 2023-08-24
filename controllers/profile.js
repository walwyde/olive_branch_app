const StaffProfile = require("../models/StaffProfile");
const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
  const client = !req.user.isStaff;
  const staff = req.user.isStaff;
  let profile = {};
  let medArr = [];
  let medDoseArr;

  try {
    if (staff) {
      const {
        history,
        fullname,
        age,
        gender,
        address,
        phone,
        email,
        medName,
        medDose,
        docName,
        docAddress,
        docContact,
      } = req.body;

      if (history) profile.history = history;
      if (fullname) profile.fullname = fullname;
      if (age) profile.age = age;
      if (gender) profile.gender = gender;
      if (address) profile.address = address;
      if (phone) profile.phone = phone;
      if (email) profile.email = email;
      if(medDose) medDoseArr = medDose.split(",").trim()
      if (medName) {
        medName.split(",").trim().map((med) => {
          const obj = {
            medName: med,
            medDose: medDoseArr[i] ? medDoseArr[i] : "unspecified",
          };
          medArr.push(obj);
        });
      }
      if (docName) profile.docName = docName;
      if (docAddress) profile.docAddress = docAddress;
      if (docContact) profile.docContact = docContact;

      profile.medications = medArr

      const newProfile = await new Profile(profile)

      if(!newProfile) return res.status(422).json({errors: [{msg: "something went wrong, please try again."}]})

      res.status(201).json(newProfile)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: err.msg }] });
  }
};

exports.loadCurrentProfile = async (req, res) => {
  console.log(req.user);
  const client = req.user.client;
  const staff = req.user.isStaff;
  let profile = {};

  try {
    if (client) profile = await Profile.findById(req.user.id);
    if (staff) profile = await StaffProfile.findById(req.user.id);
    if (!profile)
      return res.status(404).json({ errors: [{ msg: "profile not found!" }] });

    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};
