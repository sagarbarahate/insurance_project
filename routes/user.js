var express = require("express");
var exe = require("./connection");
var router = express.Router();

router.get("/",async function(req,res){

    var slider = await exe(`SELECT * FROM slider`);
    var features = await exe(`SELECT * FROM features`);
    var services = await exe(`SELECT * FROM services LIMIT 4`);
    var faq = await exe(`SELECT * FROM faq `);
    var testimonial = await exe(`SELECT * FROM testimonial`);
    var blog = await exe(`SELECT * FROM blog`);
    var company_info = await exe(`SELECT * FROM company_info`);
    var about_company = await exe(`SELECT * FROM about_company`);
    var about_counter = await exe(`SELECT * FROM about_counter`);
    var team = await exe(`SELECT * FROM team_members`);
    var faq_image = await exe(`SELECT * FROM faq_image`);
    var instagram_images = await exe(`SELECT * FROM instagram_images`);

    var obj = {"slider":slider,"features":features,"services":services,"faq":faq,"testimonial":testimonial,
               "blog":blog,"company_info":company_info[0],"about_company":about_company[0],"about_counter":about_counter[0],
               "faq_image":faq_image[0],"team":team,"instagram_images":instagram_images
              };

    res.render("user/home.ejs",obj);

});

router.get("/about",async function(req,res){
    var company_info = await exe(`SELECT * FROM company_info`);
    var instagram_images = await exe(`SELECT * FROM instagram_images`);
    var about_company = await exe(`SELECT * FROM about_company`);
    var about_counter = await exe(`SELECT * FROM about_counter`);
    var features = await exe(`SELECT * FROM features`);
    var faq = await exe(`SELECT * FROM faq `);
    var faq_image = await exe(`SELECT * FROM faq_image`);
    var team = await exe(`SELECT * FROM team_members`);

    var obj = {"company_info":company_info[0],"instagram_images":instagram_images,"about_company":about_company[0],
                "about_counter":about_counter[0],"features":features,"faq_image":faq_image[0],"faq":faq,"team":team
              };
    res.render("user/about.ejs",obj);
});

router.get("/service",async function(req,res){
    var services = await exe(`SELECT * FROM services`);
    var company_info = await exe(`SELECT * FROM company_info`);
    var instagram_images = await exe(`SELECT * FROM instagram_images`);
    var testimonial = await exe(`SELECT * FROM testimonial`);

    var obj = {"services":services,"company_info":company_info[0],"instagram_images":instagram_images,"testimonial":testimonial};
    res.render("user/service.ejs",obj);
});

router.get("/blog",async function(req,res){
    var company_info = await exe(`SELECT * FROM company_info`);
    var instagram_images = await exe(`SELECT * FROM instagram_images`);
    var blog = await exe(`SELECT * FROM blog`);

    var obj = {"company_info":company_info[0],"instagram_images":instagram_images,"blog":blog};
    res.render("user/blog.ejs",obj);
});

router.get("/contact",async function(req,res){
    var company_info = await exe(`SELECT * FROM company_info`);
    var contact_us = await exe(`SELECT * FROM contact_us`);
    var instagram_images = await exe(`SELECT * FROM instagram_images`);
    var obj = {"company_info":company_info[0],"contact_us":contact_us[0],"instagram_images":instagram_images};
    res.render("user/contact.ejs",obj);
});

module.exports = router;