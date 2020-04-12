/*
 Navicat Premium Data Transfer

 Source Server         : shop
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 26/03/2020 09:39:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods_search
-- ----------------------------
DROP TABLE IF EXISTS `goods_search`;
CREATE TABLE `goods_search`  (
  `id` int(10) NOT NULL,
  `imageSrc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `commodityName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pprice` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `oprice` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `discount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_search
-- ----------------------------
INSERT INTO `goods_search` VALUES (1, '../../static/img/commodity1.jpg', '新款毛衣,材质来自意大利脱落州', '255', '15', '5');
INSERT INTO `goods_search` VALUES (2, '../../static/img/commodity2.jpg', '新款皮衣', '100', '5', '6');
INSERT INTO `goods_search` VALUES (3, '../../static/img/commodity3.jpg', '新款毛衣', '50', '1', '3');
INSERT INTO `goods_search` VALUES (4, '../../static/img/commodity4.jpg', '新款什么衣服', '10000', '100', '1');
INSERT INTO `goods_search` VALUES (5, '../../static/img/commodity4.jpg', '皮靴', '100', '10', '1');
INSERT INTO `goods_search` VALUES (6, '../../static/img/commodity3.jpg', '运动鞋子', '125', '25', '2');
INSERT INTO `goods_search` VALUES (7, '../../static/img/commodity3.jpg', '大衣服', '100', '50', '3');
INSERT INTO `goods_search` VALUES (8, '../../static/img/commodity2.jpg', '线绒大衣', '555', '50', '2');
INSERT INTO `goods_search` VALUES (9, '../../static/img/commodity1.jpg', '线绒风衣', '200', '10', '3');

SET FOREIGN_KEY_CHECKS = 1;
