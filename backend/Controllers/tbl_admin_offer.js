const connection = require("../Model/model");

////get view offer

const viewOffer = (req, res) => {
    const selectQuery = `SELECT * FROM tbl_admin_offer`;
  
    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching offers:', err);
        return res.status(500).json({ error: 'An error occurred while fetching offers.' });
      }
  
      return res.status(200).json(results);
    });
  };

  ///// post create offer 

const createOffer = (req, res) => {
  const offerData = req.body;

  const insertQuery = `
    INSERT INTO tbl_admin_offer SET ?
  `;

  connection.query(insertQuery, offerData, (err, results) => {
    if (err) {
      console.error('Error creating offer:', err);
      return res.status(500).json({ error: 'An error occurred while creating the offer.' });
    }

    return res.status(201).json({ message: 'Offer created successfully!' });
  });
};
  ///patch update offer
  
const updateOffer = async (req, res) => {
  try {
    const offerId = req.params.offerid;
    const {
      offername,
      percentage_discount,
      flat_discount,
      upto_discount,
      valid_from,
      valid_to,
      Subcategoryid,
      terms_and_condition,
      status,
    } = req.body;

    // Your database query to update the offer
    const updateQuery = `
      UPDATE tbl_admin_offer
      SET offername = ?,
          percentage_discount = ?,
          flat_discount = ?,
          upto_discount = ?,
          valid_from = ?,
          valid_to = ?,
          Subcategoryid = ?,
          terms_and_condition = ?,
          status = ?
      WHERE offerid = ?
    `;

    // Execute the query with the provided values
    connection.query(
      updateQuery,
      [
        offername,
        percentage_discount,
        flat_discount,
        upto_discount,
        valid_from,
        valid_to,
        Subcategoryid,
        terms_and_condition,
        status,
        offerId,
      ],
      (err, results) => {
        if (err) {
          console.error('Error updating offer:', err);
          return res.status(500).json({ error: 'An error occurred while updating the offer.' });
        }

        return res.status(200).json({ message: 'Offer updated successfully!' });
      }
    );
  } catch (err) {
    console.error('Error updating offer:', err);
    return res.status(500).json({ error: 'An error occurred while updating the offer.' });
  }
};
  


const updateStatus = (req, res) => {
    const offerid = req.params.offerid;
    const { status } = req.body;
  
    const updateStatusQuery = `
      UPDATE tbl_admin_offer
      SET status = ?
      WHERE offerid = ?
    `;
  
    connection.query(updateStatusQuery, [status, offerid], (err, results) => {
      if (err) {
        console.error('Error updating offer status:', err);
        return res.status(500).json({ error: 'An error occurred while updating the offer status.' });
      }
  
      return res.status(200).json({ message: 'Offer status updated successfully!' });
    });
  };
/////get offer by discount
const findOfferByDiscount = (req, res) => {
    const bydiscount = req.params.bydiscount;
  
    const findQuery = `
      SELECT * FROM tbl_admin_offer
      WHERE percentage_discount = ? OR flat_discount = ?
    `; 
  
    connection.query(findQuery, [bydiscount, bydiscount], (err, results) => {
      if (err) {
        console.error('Error finding offers by discount:', err);
        return res.status(500).json({ error: 'An error occurred while finding offers by discount.' });
      }
  
      return res.status(200).json(results);
    });
  };


module.exports={viewOffer,updateOffer,updateStatus,findOfferByDiscount,createOffer}