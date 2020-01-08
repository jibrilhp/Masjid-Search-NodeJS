const mongoose = require('mongoose');
const Product = mongoose.model('products');
const request = require('request');

module.exports = (app) => {

  app.get(`/api/product`, async (req, res) => {


    let url = "https://jibs.my.id/api/masjid/getLastMasjid";

    let options = { json: true };



    request(url, options, (error, res, body) => {
      if (error) {
        return res.status(200).send({
          error: true,
          error
        })
      };

      if (!error && res.statusCode == 200) {
        return res.status(200).send({
          error: false,
          body
        })
      };



    });
  });



  app.post(`/api/product`, async (req, res) => {
    let product = await Product.create(req.body);
    console.log(req.body);
    return res.status(201).send({
      error: false,
      product
    });
  });

  app.put(`/api/product/:id`, async (req, res) => {
    const { id } = req.params;

    let product = await Product.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      product
    });

  });

  app.delete(`/api/product/:id`, async (req, res) => {
    const { id } = req.params;

    let product = await Product.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      product
    });

  });

}