const express=require("express");
const { protect } = require("../middleware/autthMiddleware");
const { acessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/ChatControllers");
const router=express.Router();

router.post('/',protect,acessChat);
router.get('/',protect,fetchChats);
router.post('/group',protect,createGroupChat);
router.put('/rename',protect,renameGroup);
router.put('/groupadd',protect,addToGroup);
router.put('/groupremove',protect,removeFromGroup);


module.exports=router;