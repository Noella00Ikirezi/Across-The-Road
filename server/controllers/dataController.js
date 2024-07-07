const pool = require('../config/db');
const logger = require('../config/logger');

const insertData = async (req, res) => {
    console.log('Received insert data request:', req.body);
    const { title, url, userId, componentsData } = req.body;

    // Check if userId is null
    if (!userId) {
        console.error('userId is null or undefined');
        logger.error('userId is null or undefined in insertData request');
        return res.status(400).json({ error: 'userId is required' });
    }

    let parsedData;
    try {
        parsedData = JSON.parse(componentsData);
        console.log('Parsed componentsData:', parsedData);
    } catch (error) {
        console.error('Invalid componentsData format:', error);
        logger.error(`Invalid componentsData format: ${error.message}`);
        return res.status(400).json({ error: 'Invalid componentsData format' });
    }

    parsedData.navbar = parsedData.navbar || {};
    parsedData.aboutSections = parsedData.aboutSections || [];
    parsedData.services = parsedData.services || [];
    parsedData.feedbacks = parsedData.feedbacks || [];
    parsedData.teamMembers = parsedData.teamMembers || { members: [], info: {} };
    parsedData.footer = parsedData.footer || {};

    const files = req.files;
    console.log('Files received:', files);

    const connection = await pool.getConnection();
    try {
        console.log('Starting transaction');
        await connection.beginTransaction();

        // Insert into Pages Table
        const pagesSql = 'INSERT INTO pages (title, url, userId) VALUES (?, ?, ?)';
        const [pagesResult] = await connection.query(pagesSql, [title, url, userId]);
        const pageId = pagesResult.insertId;
        console.log('Inserted into pages with ID:', pageId);
        logger.info(`Inserted into pages with ID: ${pageId}`);

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        // Handle Navbar Image
        if (files['navbar_logo']) {
            parsedData.navbar.logo = `${baseUrl}/uploads/${files['navbar_logo'][0].filename}`;
        }

        // Handle About Sections Images
        parsedData.aboutSections.forEach((section, index) => {
            if (files[`about_image_${index}`]) {
                section.imageUrl = `${baseUrl}/uploads/${files[`about_image_${index}`][0].filename}`;
            }
        });

        // Handle Services Images
        parsedData.services.forEach((service, index) => {
            if (files[`service_image_${index}`]) {
                service.img = `${baseUrl}/uploads/${files[`service_image_${index}`][0].filename}`;
            }
        });

        // Handle Feedbacks Images
        parsedData.feedbacks.forEach((feedback, index) => {
            if (files[`feedback_image_${index}`]) {
                feedback.img = `${baseUrl}/uploads/${files[`feedback_image_${index}`][0].filename}`;
            }
        });

        // Handle Team Members Images
        parsedData.teamMembers.members.forEach((member, index) => {
            if (files[`team_image_${index}`]) {
                member.img = `${baseUrl}/uploads/${files[`team_image_${index}`][0].filename}`;
            }
        });

        // Handle Footer-render.jsx Image
        if (files['footer_image']) {
            parsedData.footer.logo = `${baseUrl}/uploads/${files['footer_image'][0].filename}`;
        }

        // Insert Navbar Data
        const navbarSql = 'INSERT INTO navbar (logo, pageId) VALUES (?, ?)';
        await connection.query(navbarSql, [parsedData.navbar.logo, pageId]);
        console.log('Inserted into navbar');
        logger.info(`Inserted into navbar for page ID: ${pageId}`);

        // Insert About Sections Data
        for (const section of parsedData.aboutSections) {
            const aboutSql = 'INSERT INTO about_sections (title, content, imageUrl, tempImageUrl, pageId) VALUES (?, ?, ?, ?, ?)';
            await connection.query(aboutSql, [section.title, section.content, section.imageUrl, section.tempImageUrl, pageId]);
            console.log('Inserted into about_sections');
            logger.info(`Inserted into about_sections for page ID: ${pageId}`);
        }

        // Insert Services Data
        for (const service of parsedData.services) {
            const serviceSql = 'INSERT INTO services (title, content, img, pageId) VALUES (?, ?, ?, ?)';
            await connection.query(serviceSql, [service.title, service.content, service.img, pageId]);
            console.log('Inserted into services');
            logger.info(`Inserted into services for page ID: ${pageId}`);
        }

        // Insert Feedbacks Data
        for (const feedback of parsedData.feedbacks) {
            const feedbackSql = 'INSERT INTO feedbacks (content, name, role, img, tempImageUrl, pageId) VALUES (?, ?, ?, ?, ?, ?)';
            await connection.query(feedbackSql, [feedback.content, feedback.name, feedback.role, feedback.img, feedback.tempImageUrl, pageId]);
            console.log('Inserted into feedbacks');
            logger.info(`Inserted into feedbacks for page ID: ${pageId}`);
        }

        // Insert Team Members Data
        for (const member of parsedData.teamMembers.members) {
            const memberSql = 'INSERT INTO team_members (name, role, img, pageId) VALUES (?, ?, ?, ?)';
            await connection.query(memberSql, [member.name, member.role, member.img, pageId]);
            console.log('Inserted into team_members');
            logger.info(`Inserted into team_members for page ID: ${pageId}`);
        }

        // Insert Team Info Data
        const teamInfo = parsedData.teamMembers.info;
        const teamInfoSql = 'INSERT INTO team_info (title, description, pageId) VALUES (?, ?, ?)';
        await connection.query(teamInfoSql, [teamInfo.title, teamInfo.description, pageId]);
        console.log('Inserted into team_info');
        logger.info(`Inserted into team_info for page ID: ${pageId}`);

        // Insert Footer-render.jsx Data
        const footerSql = 'INSERT INTO footer (logo, pageId) VALUES (?, ?)';
        await connection.query(footerSql, [parsedData.footer.logo, pageId]);
        console.log('Inserted into footer');
        logger.info(`Inserted into footer for page ID: ${pageId}`);

        await connection.commit();
        console.log('Transaction committed successfully');
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        await connection.rollback();
        console.error('Error during transaction:', error);
        logger.error(`Error during data insertion transaction: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        connection.release();
    }
};

// Function to fetch all pages and their data
const fetchAllPages = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const pagesSql = 'SELECT * FROM pages';
        const [pages] = await connection.query(pagesSql);

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const results = [];

        for (const page of pages) {
            const pageId = page.id;

            // Fetch Navbar Data
            const [navbar] = await connection.query('SELECT * FROM navbar WHERE pageId = ?', [pageId]);

            // Fetch About Sections Data
            const [aboutSections] = await connection.query('SELECT * FROM about_sections WHERE pageId = ?', [pageId]);

            // Fetch Services Data
            const [services] = await connection.query('SELECT * FROM services WHERE pageId = ?', [pageId]);

            // Fetch Feedbacks Data
            const [feedbacks] = await connection.query('SELECT * FROM feedbacks WHERE pageId = ?', [pageId]);

            // Fetch Team Members Data
            const [teamMembers] = await connection.query('SELECT * FROM team_members WHERE pageId = ?', [pageId]);

            // Fetch Team Info Data
            const [teamInfo] = await connection.query('SELECT * FROM team_info WHERE pageId = ?', [pageId]);

            // Fetch Footer-render.jsx Data
            const [footer] = await connection.query('SELECT * FROM footer WHERE pageId = ?', [pageId]);

            // Constructing the URLs for images
            if (navbar.length > 0) {
                navbar[0].logo = `${baseUrl}/uploads/${navbar[0].logo}`;
            }

            aboutSections.forEach(section => {
                section.imageUrl = section.imageUrl ? `${baseUrl}/uploads/${section.imageUrl}` : null;
            });

            services.forEach(service => {
                service.img = service.img ? `${baseUrl}/uploads/${service.img}` : null;
            });

            feedbacks.forEach(feedback => {
                feedback.img = feedback.img ? `${baseUrl}/uploads/${feedback.img}` : null;
            });

            teamMembers.forEach(member => {
                member.img = member.img ? `${baseUrl}/uploads/${member.img}` : null;
            });

            if (teamInfo.length > 0) {
                teamInfo[0].logo = `${baseUrl}/uploads/${teamInfo[0].logo}`;
            }

            if (footer.length > 0) {
                footer[0].logo = `${baseUrl}/uploads/${footer[0].logo}`;
            }

            results.push({
                page,
                navbar: navbar[0] || null,
                aboutSections,
                services,
                feedbacks,
                teamMembers,
                teamInfo: teamInfo[0] || null,
                footer: footer[0] || null,
            });
        }

        connection.release();
        logger.info(`Fetched all pages and their components`);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error('Error fetching pages:', error);
        logger.error(`Error fetching pages: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const fetchPageById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const pageSql = 'SELECT * FROM pages WHERE id = ?';
        const [pages] = await connection.query(pageSql, [id]);

        if (pages.length === 0) {
            return res.status(404).json({ error: 'Page not found' });
        }

        const page = pages[0];
        const pageId = page.id;

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        // Fetch Navbar Data
        const [navbar] = await connection.query('SELECT * FROM navbar WHERE pageId = ?', [pageId]);

        // Fetch About Sections Data
        const [aboutSections] = await connection.query('SELECT * FROM about_sections WHERE pageId = ?', [pageId]);

        // Fetch Services Data
        const [services] = await connection.query('SELECT * FROM services WHERE pageId = ?', [pageId]);

        // Fetch Feedbacks Data
        const [feedbacks] = await connection.query('SELECT * FROM feedbacks WHERE pageId = ?', [pageId]);

        // Fetch Team Members Data
        const [teamMembers] = await connection.query('SELECT * FROM team_members WHERE pageId = ?', [pageId]);

        // Fetch Team Info Data
        const [teamInfo] = await connection.query('SELECT * FROM team_info WHERE pageId = ?', [pageId]);

        // Fetch Footer Data
        const [footer] = await connection.query('SELECT * FROM footer WHERE pageId = ?', [pageId]);

        // Constructing the URLs for images
        if (navbar.length > 0) {
            navbar[0].logo = `${baseUrl}/uploads/${navbar[0].logo}`;
        }

        aboutSections.forEach(section => {
            section.imageUrl = section.imageUrl ? `${baseUrl}/uploads/${section.imageUrl}` : null;
        });

        services.forEach(service => {
            service.img = service.img ? `${baseUrl}/uploads/${service.img}` : null;
        });

        feedbacks.forEach(feedback => {
            feedback.img = feedback.img ? `${baseUrl}/uploads/${feedback.img}` : null;
        });

        teamMembers.forEach(member => {
            member.img = member.img ? `${baseUrl}/uploads/${member.img}` : null;
        });

        if (teamInfo.length > 0) {
            teamInfo[0].logo = `${baseUrl}/uploads/${teamInfo[0].logo}`;
        }

        if (footer.length > 0) {
            footer[0].logo = `${baseUrl}/uploads/${footer[0].logo}`;
        }

        const result = {
            page,
            navbar: navbar[0] || null,
            aboutSections,
            services,
            feedbacks,
            teamMembers,
            teamInfo: teamInfo[0] || null,
            footer: footer[0] || null,
        };

        connection.release();
        logger.info(`Fetched page and its components for page ID: ${pageId}`);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching page by ID:', error);
        logger.error(`Error fetching page by ID: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const fetchPagesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const connection = await pool.getConnection();
        const pagesSql = 'SELECT * FROM pages WHERE userId = ?';
        const [pages] = await connection.query(pagesSql, [userId]);
        connection.release();

        if (pages.length === 0) {
            return res.status(404).json({ error: 'No pages found for this user' });
        }

        res.status(200).json({ success: true, data: pages });
    } catch (error) {
        console.error('Error fetching pages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    fetchPagesByUserId,
    insertData,
    fetchAllPages,
    fetchPageById,
};

