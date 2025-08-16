var express = require("express");
var router = express.Router();
var exe = require("./connection");
const { render } = require("ejs");

router.get("/",function(req,res){
    res.render("admin/home.ejs");
});

router.get("/slider",async function(req,res){
    var data = await exe(`SELECT * FROM slider`);
    var obj = {"slider":data}
    res.render("admin/slider.ejs",obj);
});

router.post("/save_slider",async function(req,res){
    var d = req.body;
    var slider_image = new Date().getTime()+req.files.slider_image.name;
    req.files.slider_image.mv("public/uploads/"+slider_image);

    var sql = `INSERT INTO slider(slider_heading,slider_content,slider_image,button_text,button_link)
    VALUES ('${d.slider_heading}','${d.slider_content}','${slider_image}','${d.button_text}','${d.button_link}')`;

    var data = await exe(sql);
    res.redirect("/admin/slider");
    // res.send(d)
});

router.get("/edit_slider/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM slider WHERE slider_id = '${id}' `);
    var obj = {"slider_info":data[0]};
    res.render("admin/edit_slider.ejs",obj);
});

router.post("/update_slider",async function(req,res){
    var d = req.body;

    if(req.files != null)
    {
        var slider_image = new Date().getTime()+req.files.slider_image.name;

        req.files.slider_image.mv("public/uploads/"+slider_image);

        var sql = `UPDATE slider SET slider_image = '${slider_image}' WHERE slider_id = '${d.slider_id}'`;
        var data = await exe(sql);
    }

    var sql = `UPDATE slider SET slider_heading = '${d.slider_heading}', slider_content ='${d.slider_content}',
     button_text='${d.button_text}', button_link='${d.button_link}' WHERE slider_id = '${d.slider_id}'`;
    var data = await exe(sql);

    res.redirect("/admin/slider");

});

router.get("/delete_slider/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`DELETE FROM slider WHERE slider_id = '${id}' `);
    res.redirect("/admin/slider");
});

router.get("/features",async function(req,res){
    var data = await exe(`SELECT * FROM features`);
    var obj = {"feature":data};
    res.render("admin/features.ejs",obj);
});

router.post("/save_features",async function(req,res){
    var d = req.body;

    var feature_icon_image = new Date().getTime()+req.files.feature_icon_image.name;
    req.files.feature_icon_image.mv("public/uploads/"+feature_icon_image);


    var sql = `INSERT INTO features(feature_label,feature_icon_image,feature_details)
    VALUES ('${d.feature_label}','${feature_icon_image}','${d.feature_details}')`;

    var data = await exe(sql);

    res.redirect("/admin/features");

});

router.get("/edit_feature/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM features WHERE features_id = '${id}' `);
    var obj = {"features_info":data[0]};
    res.render("admin/edit_feature.ejs",obj);
});

router.post("/update_features",async function(req,res){
    var d = req.body;
    
    if(req.files != null)
    {
        var feature_icon_image = new Date().getTime()+req.files.feature_icon_image.name;
        req.files.feature_icon_image.mv("public/uploads/"+feature_icon_image);

        var sql = `UPDATE features SET feature_icon_image = '${feature_icon_image}' 
        WHERE features_id = '${d.features_id}' `;

        var data = await exe(sql);
    }

    var sql = `UPDATE features SET feature_label = '${d.feature_label}', feature_details = '${d.feature_details}'
    WHERE features_id = '${d.features_id}' `;
    var data = await exe(sql);

    res.redirect("/admin/features");

});

router.get("/delete_feature/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`DELETE FROM features WHERE features_id = '${id}' `);
    res.redirect("/admin/features");
});

router.get("/services",async function(req,res){
    var data = await exe(`SELECT * FROM services`);
    var obj = {"services":data};
    res.render("admin/services.ejs",obj);
});

router.post("/save_services",async function(req,res){
    var d = req.body;

    var service_image = new Date().getTime()+req.files.service_image.name;
    req.files.service_image.mv("public/uploads/"+service_image);

    var sql = `INSERT INTO services(service_title,service_details,service_image)
    VALUES ('${d.service_title}','${d.service_details}','${service_image}')`;
    var data = await exe(sql);

    res.redirect("/admin/services");

});

router.get("/edit_services/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM services WHERE services_id = '${id}' `);
    var obj = {"services_info":data[0]};
    res.render("admin/edit_services.ejs",obj);
});

router.post("/update_services",async function(req,res){
    var d = req.body;

    if (req.files != null)
    {
        var service_image = new Date().getTime()+req.files.service_image.name;
        req.files.service_image.mv("public/uploads/"+service_image);
        var sql = `UPDATE services SET service_image = '${service_image}' WHERE services_id = '${d.services_id}' `;
        var data = await exe(sql);
    }

    var sql = `UPDATE services SET service_title = '${d.service_title}' , service_details = '${d.service_details}' 
    WHERE services_id = '${d.services_id}' `;
    var data = await exe(sql);

    res.redirect("/admin/services");

});

router.get("/delete_services/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`DELETE FROM services WHERE services_id = '${id}' `);
    res.redirect("/admin/services");
});

router.get("/faq",async function(req,res){
    var data = await exe(`SELECT * FROM faq`);
    var faq_image = await exe(`SELECT * FROM faq_image`);
    var obj = {"faq":data,"faq_image":faq_image[0]};
    res.render("admin/faq.ejs",obj);
});

router.post("/save_faq",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO faq(faq_question,faq_answer) VALUES ('${d.faq_question}','${d.faq_answer}')`;
    var data = await exe(sql);
    res.redirect("/admin/faq");
});

router.post("/update_faq_image",async function(req,res){

    var faq_img = new Date().getTime()+req.files.faq_img.name;
    req.files.faq_img.mv("public/uploads/"+faq_img);

    var sql = `UPDATE faq_image SET faq_img ='${faq_img}' WHERE faq_image_id = 1 `;
    var data = await exe(sql);

    res.redirect("/admin/faq");
});

router.get("/edit_faq/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM faq WHERE faq_id = '${id}' `);
    var obj = {"faq_info":data[0]};
    res.render("admin/edit_faq.ejs",obj);
});

router.post("/update_faq",async function(req,res){
    var d = req.body;
    var sql = `UPDATE faq SET faq_question = '${d.faq_question}', faq_answer = '${d.faq_answer}' WHERE faq_id = '${d.faq_id}' `;
    var data = await exe(sql);
    res.redirect("/admin/faq");
});

router.get("/delete_faq/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`DELETE FROM faq WHERE faq_id = '${id}' `);
    res.redirect("/admin/faq");
});

router.get("/testimonial",async function(req,res){
    var data = await exe(`SELECT * FROM testimonial`);
    var obj = {"test":data};
    res.render("admin/testimonial.ejs",obj);
});

router.post("/save_testimonial",async function(req,res){
    var d = req.body;

    var customer_image = new Date().getTime()+req.files.customer_image.name;
    req.files.customer_image.mv("public/uploads/"+customer_image);

    var sql = `INSERT INTO testimonial(customer_image,customer_name,customer_position,customer_review_rating,customer_review_details)
    VALUES ('${customer_image}','${d.customer_name}','${d.customer_position}','${d.customer_review_rating}','${d.customer_review_details}')`;
    var data = await exe(sql);
    res.redirect("/admin/testimonial");
});

router.get("/edit_testimonial/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM testimonial WHERE testimonial_id = '${id}' `);
    var obj = {"testimonial_info":data[0]};
    res.render("admin/edit_testimonial.ejs",obj);
});

router.post("/update_testimonial",async function(req,res){
    var d = req.body;

    if (req.files != null)
    {
        var customer_image = new Date().getTime()+req.files.customer_image.name;
        req.files.customer_image.mv("public/uploads/"+customer_image);
        var sql = `UPDATE testimonial SET customer_image = '${customer_image}' WHERE testimonial_id = '${d.testimonial_id}' `;
        var data = await exe(sql);
    }

    var sql = `UPDATE testimonial SET customer_name = '${d.customer_name}',customer_position = '${d.customer_position}',
    customer_review_rating = '${d.customer_review_rating}',customer_review_details = '${d.customer_review_details}' WHERE 
    testimonial_id = '${d.testimonial_id}' `;
    var data = await exe(sql);

    res.redirect("/admin/testimonial");

});

router.get("/delete_testimonial/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`DELETE FROM testimonial WHERE testimonial_id = '${id}' `);
    res.redirect("/admin/testimonial");
});

router.get("/team",async function(req,res){
    var data = await exe(`SELECT * FROM team_members`);
    var obj = {"team":data};
    res.render("admin/team.ejs",obj);
});

router.post("/save_team",async function(req,res){
    var d = req.body;

    var team_image = new Date().getTime()+req.files.team_image.name;
    req.files.team_image.mv("public/uploads/"+team_image);

    var sql = `INSERT INTO team_members (team_name, team_position, team_image, team_fb_link,
     team_insta_link, team_twitter_link, team_linkedin_link) VALUES
     ('${d.team_name}', '${d.team_position}', '${team_image}', '${d.team_fb_link}', '${d.team_insta_link}', '${d.team_twitter_link}', '${d.team_linkedin_link}')
     `;
     var data = await exe(sql);
     res.redirect("/admin/team");
});

router.get("/edit_team/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM team_members WHERE team_members_id = '${id}' `);
    var obj = {"team_info":data[0]};
    res.render("admin/edit_team.ejs",obj);
});

router.post("/update_team",async function(req,res){

    var d = req.body;

    if (req.files != null)
    {    
        var team_image = new Date().getTime()+req.files.team_image.name;
        req.files.team_image.mv("public/uploads/"+team_image);

        var sql = `UPDATE team_members SET team_image = '${team_image}'  WHERE 
        team_members_id = '${d.team_members_id} ' `;
        var data = await exe(sql);

    }
    
    var sql = `
    UPDATE team_members 
    SET 
        team_name = '${d.team_name}', 
        team_position = '${d.team_position}', 
        team_fb_link = '${d.team_fb_link}', 
        team_insta_link = '${d.team_insta_link}', 
        team_twitter_link = '${d.team_twitter_link}', 
        team_linkedin_link = '${d.team_linkedin_link}' 
    WHERE 
        team_members_id = ${d.team_members_id}
    `;
    var data = await exe(sql);

    res.redirect("/admin/team");
});

router.get("/delete_team/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`DELETE FROM team_members WHERE  team_members_id = '${id}' `);
    res.redirect("/admin/team");
});

router.get("/blog",async function(req,res){
    var data = await exe(`SELECT * FROM blog`);
    var obj = {"blog":data};
    res.render("admin/blog.ejs",obj);
});

router.post("/save_blog",async function(req,res){
    var d = req.body;

    var blog_image = new Date().getTime()+req.files.blog_image.name;
    req.files.blog_image.mv("public/uploads/"+blog_image);

    var sql = `
    INSERT INTO blog (
        blog_title, 
        blog_details, 
        blog_image, 
        blog_date, 
        blog_post_by
    ) VALUES (
        '${d.blog_title}', 
        '${d.blog_details}', 
        '${blog_image}', 
        '${d.blog_date}', 
        '${d.blog_post_by}'
    )`;
    var data = await exe(sql);
    res.redirect("/admin/blog");
});

router.get("/edit_blog/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM blog WHERE blog_id = '${id}' `);
    var obj = {"blog_info":data[0]};
    res.render("admin/edit_blog.ejs",obj);
});

router.post("/update_blog",async function(req,res){
    var d = req.body;

    if (req.files != null)
    {
        var blog_image = new Date().getTime()+req.files.blog_image.name;
        req.files.blog_image.mv("public/uploads/"+blog_image);
        
        var sql = `UPDATE blog SET blog_image = '${blog_image}' WHERE blog_id = ${d.blog_id}  `;
        var data = await exe(sql);
    }

    var sql = `UPDATE blog 
    SET blog_title = '${d.blog_title}', 
        blog_details = '${d.blog_details}', 
        blog_date = '${d.blog_date}', 
        blog_post_by = '${d.blog_post_by}' 
    WHERE blog_id = ${d.blog_id}`;
    var data = await exe(sql);
    res.redirect("/admin/blog");

});

router.get("/delete_blog/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`DELETE FROM blog WHERE blog_id = ${id}`);
    res.redirect("/admin/blog");
});

router.get("/instagram_link",async function(req,res){
    var data = await exe(`SELECT * FROM instagram_images`);
    var obj = {"insta":data};
    res.render("admin/instagram_link.ejs",obj);
});

router.post("/save_instagram_link",async function(req,res){
    var d = req.body;

    var insta_image = new Date().getTime()+req.files.insta_image.name;
        req.files.insta_image.mv("public/uploads/"+insta_image);

    var sql = `INSERT INTO instagram_images(insta_image,insta_link) VALUES
    ('${insta_image}','${d.insta_link}')`;
    var data = await exe(sql);

    res.redirect("/admin/instagram_link");

});

router.get("/edit_insta/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM instagram_images WHERE instagram_images_id = '${id}' `);
    var obj = {"insta_info":data[0]};
    res.render("admin/edit_insta.ejs",obj);
});

router.post("/update_instagram_link",async function(req,res){
    var d = req.body;

    if (req.files != null)
        {
            var insta_image = new Date().getTime()+req.files.insta_image.name;
            req.files.insta_image.mv("public/uploads/"+insta_image);
            
            var sql = `UPDATE instagram_images SET insta_image = '${insta_image}' WHERE instagram_images_id = ${d.instagram_images_id}  `;
            var data = await exe(sql);
        }
    
    var sql = `UPDATE instagram_images SET insta_link = '${d.insta_link}' WHERE instagram_images_id = ${d.instagram_images_id} `;
    var data = await exe(sql);

    res.redirect("/admin/instagram_link");

});

router.get("/delete_insta/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`DELETE FROM instagram_images WHERE instagram_images_id = ${id}`);
    res.redirect("/admin/instagram_link");
});

router.get("/company_info",async function(req,res){
    var data = await exe(`SELECT * FROM company_info`);
    var obj = {"company_info":data[0]};
    res.render("admin/company_info.ejs",obj);
});

router.post("/update_company_info",async function(req,res){
    var d = req.body;
   
    if (req.files != null)
        {
            var company_logo = new Date().getTime()+req.files.company_logo.name;
            req.files.company_logo.mv("public/uploads/"+company_logo);
            
            var sql = `UPDATE company_info SET company_logo = '${company_logo}' WHERE company_info_id = ${d.company_info_id}  `;
            var data = await exe(sql);
        }
   
    var sql = `
    UPDATE company_info 
    SET 
        company_name = '${d.company_name}', 
        company_mobile = '${d.company_mobile}', 
        company_email = '${d.company_email}', 
        company_address = '${d.company_address}', 
        company_sub_details = '${d.company_sub_details}', 
        company_fb_link = '${d.company_fb_link}', 
        company_insta_link = '${d.company_insta_link}', 
        company_linkedin_link = '${d.company_linkedin_link}', 
        company_twitter_link = '${d.company_twitter_link}', 
        company_whatsapp_no = '${d.company_whatsapp_no}'
        `;
    
    var data = await exe(sql);
    res.redirect("/admin/company_info");
});

router.get("/about",async function(req,res){
    var data = await exe(`SELECT * FROM about_company`);
    var obj = {"about_company":data[0]};
    res.render("admin/about.ejs",obj);
});

router.post("/update_about_company",async function(req,res){
    var d = req.body;
    var sql = `UPDATE about_company 
           SET about_heading = '${d.about_heading}', 
               about_details = '${d.about_details}', 
               about_point1 = '${d.about_point1}', 
               about_point2 = '${d.about_point2}', 
               about_point3 = '${d.about_point3}' 
           WHERE about_company_id = '${d.about_company_id}'`;

    var data = await exe(sql);
    res.redirect("/admin/about");
});

router.get("/about_counter",async function(req,res){
    var data = await exe(`SELECT * FROM about_counter`);
    var obj = {"about_counter":data[0]};
    res.render("admin/about_counter.ejs",obj);
});

router.post("/update_about_counter",async function(req,res){
    var d = req.body;

    if (req.files != null)
        {
            var about_counter_image = new Date().getTime()+req.files.about_counter_image.name;
            req.files.about_counter_image.mv("public/uploads/"+about_counter_image);
            
            var sql = `UPDATE about_counter SET about_counter_image = '${about_counter_image}' WHERE about_counter_id = ${d.about_counter_id}  `;
            var data = await exe(sql);
        }
       

    var sql = `
    UPDATE about_counter 
    SET 
        total_insurance_policies = '${d.total_insurance_policies}', 
        total_awards_won = '${d.total_awards_won}', 
        total_skilled_agent = '${d.total_skilled_agent}', 
        total_team_members = '${d.total_team_members}'
    WHERE 
        about_counter_id = '${d.about_counter_id}'
    `;
    var data = await exe(sql);
    res.redirect("/admin/about_counter");
});

router.get("/contact_us",async function(req,res){
    var data = await exe(`SELECT * FROM contact_us`);
    var obj = {"contact_us":data[0]};
    res.render("admin/contact_us.ejs",obj);
});

router.post("/update_contact_us",async function(req,res){

    var d = req.body;

    if (req.files != null)
        {
            var contact_img = new Date().getTime()+req.files.contact_img.name;
            req.files.contact_img.mv("public/uploads/"+contact_img);
            
            var sql = `UPDATE contact_us SET contact_img = '${contact_img}' WHERE contact_us_id = ${d.contact_us_id}  `;
            var data = await exe(sql);
        }
        
    var sql = `UPDATE contact_us
               SET 
               contact_map_link = '${d.contact_map_link}'
               WHERE contact_us_id = ${d.contact_us_id};
              `;
    var data = await exe(sql);
    res.redirect("/admin/contact_us");
});

router.post("/save_email",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO newsletter(customer_email) VALUES ('${d.customer_email}')`;
    var data = await exe(sql);
    res.redirect("/");
});

router.post("/save_message",async function(req,res){
    var d = req.body;
    var sql = `
    INSERT INTO contact_info (
        user_name, 
        user_email, 
        user_mobile, 
        user_project, 
        user_subject, 
        user_message
    ) VALUES (
        '${d.user_name}', 
        '${d.user_email}', 
        '${d.user_mobile}', 
        '${d.user_project}', 
        '${d.user_subject}', 
        '${d.user_message}'
    );
`;
    var data = await exe(sql);
    res.redirect("/");
});

router.get("/user_message",async function(req,res){
    var data = await exe(`SELECT * FROM contact_info`);
    var obj = {"contact_info":data};
    res.render("admin/user_message.ejs",obj);
});

module.exports = router;