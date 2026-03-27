import User from "../models/User.js";

// @desc    Update user XP and completed modules
// @route   POST /api/user/progress
// @access  Private (should be, but using simple approach for now)
export const updateProgress = async (req, res) => {
    try {
        const { userId, xpToAdd, moduleId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID required" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (xpToAdd) {
            user.xp += xpToAdd;
        }

        if (moduleId && !user.completedModules.includes(moduleId)) {
            user.completedModules.push(moduleId);
        }

        await user.save();

        res.json({
            message: "Progress updated",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                xp: user.xp,
                completedModules: user.completedModules,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
