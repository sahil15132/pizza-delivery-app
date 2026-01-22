const adminMiddleware = (req, res, next) => {
    // req.user comes from your existing auth middleware
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin rights required." });
    }
};

module.exports = adminMiddleware;