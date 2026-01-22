const adminMiddleware = (req, res, next) => {
    // Check if the user is authenticated and has the admin role
    if (req.user && req.user.role === 'admin') {
        next(); // Allow them to proceed
    } else {
        return res.status(403).json({ message: "Access denied. Admins only!" });
    }
};

module.exports = adminMiddleware;