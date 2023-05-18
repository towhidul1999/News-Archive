const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hi From API");
});

/* Namespaces */
router.use("/auth", require("./namespaces/Auth"));

router.use("/permission", require("./namespaces/Permission"));

router.use("/user", require("./namespaces/User"));
router.use("/category", require("./namespaces/Category"));

router.use("/portal", require("./namespaces/Portal"));

router.use("/topic", require("./namespaces/Topic"));

router.use("/alias", require("./namespaces/Alias"));

router.use("/link", require("./namespaces/Link"));
router.use("/audit", require("./namespaces/Audit"));
router.use("/news", require("./namespaces/News"));

/* Namespaces */

module.exports = router;
