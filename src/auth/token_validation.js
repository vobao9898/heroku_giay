const jwt = require('jsonwebtoken');
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(
                token,
                'qwe1234', {
                    expiresIn: '365d', // it will be expired after 10 hours
                    //expiresIn: "20d" // it will be expired after 20 days
                    //expiresIn: 120 // it will be expired after 120ms
                    //expiresIn: "120s" // it will be expired after 120s
                },
                (err, decoded) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            message: 'Invalid Token...',
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                }
            );
        } else {
            return res.json({
                success: 0,
                message: 'Access Denied! Unauthorized User',
            });
        }
    },
};