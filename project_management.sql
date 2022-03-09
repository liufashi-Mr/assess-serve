/*
 Navicat Premium Data Transfer

 Source Server         : 项目统一管理系统
 Source Server Type    : MySQL
 Source Server Version : 50616
 Source Host           : rds981d677v70fg11pyh.mysql.rds.aliyuncs.com:3306
 Source Schema         : project_management

 Target Server Type    : MySQL
 Target Server Version : 50616
 File Encoding         : 65001

 Date: 10/01/2022 17:22:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for batch_single
-- ----------------------------
DROP TABLE IF EXISTS `batch_single`;
CREATE TABLE `batch_single` (
  `single_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '批次内具体货物操作id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '删除标识',
  `batch_id` int(11) DEFAULT NULL COMMENT '批次表id',
  `model` varchar(30) DEFAULT NULL COMMENT '货物型号',
  `shipment_number` int(11) DEFAULT NULL COMMENT '发货数量',
  `sign_number` int(11) DEFAULT NULL COMMENT '签收数量',
  `install_number` int(11) DEFAULT NULL COMMENT '安装数量',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`single_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of batch_single
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for doc_template
-- ----------------------------
DROP TABLE IF EXISTS `doc_template`;
CREATE TABLE `doc_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文档id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日期',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '删除标识',
  `type` tinyint(1) DEFAULT NULL COMMENT '模板类型',
  `name` varchar(60) DEFAULT NULL COMMENT '文件名',
  `file_size` varchar(20) DEFAULT NULL COMMENT '文件大小',
  `url` varchar(255) DEFAULT NULL COMMENT '文件地址',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of doc_template
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除标识 0未删除 1删除',
  `project_name` varchar(50) DEFAULT NULL COMMENT '项目名称',
  `project_no` varchar(50) DEFAULT NULL COMMENT '项目编号',
  `region` varchar(20) DEFAULT NULL COMMENT '项目所在大区',
  `level` varchar(10) DEFAULT NULL COMMENT '项目等级',
  `order_time` datetime DEFAULT NULL COMMENT '下单时间',
  `project_manager` varchar(10) DEFAULT NULL COMMENT '项目经理',
  `project_sales` varchar(10) DEFAULT NULL COMMENT '项目销售',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `plan_time` datetime DEFAULT NULL COMMENT '计划验收时间',
  `purchaser` varchar(50) DEFAULT NULL COMMENT '项目采购方',
  `consumer` varchar(50) DEFAULT NULL COMMENT '项目使用方',
  `inspector` varchar(50) DEFAULT NULL COMMENT '项目验收方',
  `contract_status` varchar(10) DEFAULT NULL COMMENT '项目合同状态',
  `contract_no` varchar(80) DEFAULT NULL COMMENT '合同编号',
  `status` tinyint(4) DEFAULT '0' COMMENT '项目进度',
  `acceptance_remark` varchar(500) DEFAULT NULL COMMENT '验收条件说明',
  `shipment_status` char(4) DEFAULT '未发货' COMMENT '发货状态',
  `shipment_plan_time` datetime DEFAULT NULL COMMENT '销售订单预计交货日期',
  `finish_plan_time` datetime DEFAULT NULL COMMENT '计划完成时间',
  PRIMARY KEY (`project_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目表';

-- ----------------------------
-- Records of project
-- ----------------------------
BEGIN;
INSERT INTO `project` VALUES (1, '2022-01-04 16:03:49', '2022-01-07 09:34:35', 0, '陇南区域智慧服务建设项目', 'LN001', '西北', 'C', '2022-01-05 12:05:45', '里斯本', '里斯本', '这是备注内容', '2022-01-12 16:06:37', '陇南区总采购', '陇南区医院', '陇南验收组', '付款合同', 'cn20220105', 0, '这是验收条件,必须得歪比歪比', '未发货', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for project_acceptance
-- ----------------------------
DROP TABLE IF EXISTS `project_acceptance`;
CREATE TABLE `project_acceptance` (
  `acceptance_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '验收主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '删除标识',
  `project_id` int(11) DEFAULT NULL COMMENT '项目id',
  `task_remark` varchar(255) DEFAULT NULL COMMENT '任务说明',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态 0未完成 1已完成 2进行中 3暂停 4失败',
  `acceptance_remark` varchar(255) DEFAULT NULL COMMENT '验收说明',
  `file_content` text COMMENT '项目验收单文件json',
  PRIMARY KEY (`acceptance_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目验收表';

-- ----------------------------
-- Records of project_acceptance
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for project_batch
-- ----------------------------
DROP TABLE IF EXISTS `project_batch`;
CREATE TABLE `project_batch` (
  `batch_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '货物收发批次id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '删除标识',
  `project_id` int(11) DEFAULT NULL COMMENT '项目id',
  `type` tinyint(1) DEFAULT NULL COMMENT '1发货 2签收',
  `user` varchar(10) DEFAULT NULL COMMENT '操作人',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `batch_number` int(11) DEFAULT NULL COMMENT '本批次收发数量',
  PRIMARY KEY (`batch_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='货物收发批次表';

-- ----------------------------
-- Records of project_batch
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for project_daily_report
-- ----------------------------
DROP TABLE IF EXISTS `project_daily_report`;
CREATE TABLE `project_daily_report` (
  `report_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '日报表id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '删除标识',
  `project_id` int(11) DEFAULT NULL COMMENT '项目id',
  `name` varchar(100) DEFAULT NULL COMMENT '日报文件名',
  `file_size` varchar(0) DEFAULT NULL COMMENT '文件大小',
  `url` varchar(255) DEFAULT NULL COMMENT '日报文件地址',
  `user` varchar(255) DEFAULT NULL COMMENT '日报发送成员(多名)',
  PRIMARY KEY (`report_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of project_daily_report
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for project_file
-- ----------------------------
DROP TABLE IF EXISTS `project_file`;
CREATE TABLE `project_file` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目附件主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(4) DEFAULT '0' COMMENT '删除标识',
  `project_id` int(11) DEFAULT '0' COMMENT '项目id',
  `related_id` int(11) DEFAULT NULL COMMENT '相关主键',
  `type` int(11) DEFAULT NULL COMMENT '文件类型',
  `name` varchar(50) DEFAULT NULL COMMENT '附件名',
  `url` varchar(255) DEFAULT NULL COMMENT '连接地址',
  `file_size` varchar(20) DEFAULT NULL COMMENT '文件大小',
  PRIMARY KEY (`file_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目文件表';

-- ----------------------------
-- Records of project_file
-- ----------------------------
BEGIN;
INSERT INTO `project_file` VALUES (1, '2022-01-08 10:35:52', '2022-01-08 10:35:52', 0, 1, NULL, 1, '虚假文档', '假装是链接', NULL);
INSERT INTO `project_file` VALUES (2, '2022-01-08 10:36:49', '2022-01-08 10:37:04', 0, 0, NULL, 2, '已完成任务列表', 'https://axure.yuantutech.com/pro/3aXrK4ex1iE/#id=z49p6l&p=4_1_1-%E5%B7%B2%E5%AE%8C%E6%88%90%E4%BB%BB%E5%8A%A1%E5%88%97%E8%A1%A8&g=1', NULL);
COMMIT;

-- ----------------------------
-- Table structure for project_hardware
-- ----------------------------
DROP TABLE IF EXISTS `project_hardware`;
CREATE TABLE `project_hardware` (
  `hardware_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目硬件主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(3) unsigned DEFAULT '0' COMMENT '删除标识 0未删除 1删除',
  `project_id` int(11) NOT NULL COMMENT '项目id',
  `model` varchar(50) DEFAULT NULL COMMENT '型号',
  `need_number` int(10) unsigned DEFAULT '0' COMMENT '需求数量',
  `shipment_number` int(10) unsigned DEFAULT '0' COMMENT '发货数量',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`hardware_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目硬件表';

-- ----------------------------
-- Records of project_hardware
-- ----------------------------
BEGIN;
INSERT INTO `project_hardware` VALUES (1, '2022-01-05 17:09:00', '2022-01-06 10:19:51', 0, 1, 'YT-580', 100, 0, NULL);
INSERT INTO `project_hardware` VALUES (2, '2022-01-05 17:10:17', '2022-01-06 10:19:58', 0, 1, 'YT-350', 80, 0, NULL);
INSERT INTO `project_hardware` VALUES (3, '2022-01-05 17:10:47', '2022-01-06 10:19:54', 0, 1, 'YT-560', 30, 0, NULL);
COMMIT;

-- ----------------------------
-- Table structure for project_purchase
-- ----------------------------
DROP TABLE IF EXISTS `project_purchase`;
CREATE TABLE `project_purchase` (
  `purchase_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '外采主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(4) DEFAULT '0' COMMENT '删除状态',
  `project_id` int(11) NOT NULL COMMENT '项目id',
  `purchase_name` varchar(80) DEFAULT NULL COMMENT '外采名称',
  `purchase_content` varchar(255) DEFAULT NULL COMMENT '外采内容',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`purchase_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目外采表';

-- ----------------------------
-- Records of project_purchase
-- ----------------------------
BEGIN;
INSERT INTO `project_purchase` VALUES (1, '2022-01-05 16:30:45', '2022-01-05 16:30:48', 0, 1, '5g远程会诊系统', '5G远程会诊系统需要其他厂商建设,XXXXXXXXXX，合同已签', 0, '外采描述');
COMMIT;

-- ----------------------------
-- Table structure for project_schedule
-- ----------------------------
DROP TABLE IF EXISTS `project_schedule`;
CREATE TABLE `project_schedule` (
  `schedule_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流程表id',
  `project_id` int(11) DEFAULT NULL COMMENT '项目id',
  `create_type` tinyint(1) DEFAULT '1' COMMENT '创建项目状态',
  `create_time` datetime DEFAULT NULL COMMENT '项目创建时间',
  `survey_type` tinyint(1) DEFAULT NULL COMMENT '调研状态',
  `survey_time` datetime DEFAULT NULL COMMENT '完成调研的时间',
  `start_type` tinyint(1) DEFAULT NULL COMMENT '项目启动状态',
  `start_time` datetime DEFAULT NULL COMMENT '项目启动时间',
  `implement_type` tinyint(1) DEFAULT NULL COMMENT '项目实施状态',
  `implement_time` datetime DEFAULT NULL COMMENT '实施完成时间',
  `acceptance_type` tinyint(1) DEFAULT NULL COMMENT '验收状态',
  `acceptance_time` datetime DEFAULT NULL COMMENT '验收时间',
  `finish_type` tinyint(1) DEFAULT NULL COMMENT '项目完成状态',
  `finish_time` datetime DEFAULT NULL COMMENT '项目完成时间',
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_schedule
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for project_software
-- ----------------------------
DROP TABLE IF EXISTS `project_software`;
CREATE TABLE `project_software` (
  `software_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '软件主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除标识 ,0未删除 ,1删除',
  `project_id` int(11) NOT NULL COMMENT '项目id',
  `software_name` varchar(50) DEFAULT NULL COMMENT '软件名称',
  `plan_time` datetime DEFAULT NULL COMMENT '计划上线时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '上线状态 0未上线 1已上线 2进行中 3暂停',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `file_content` text COMMENT '软件上线运行单json',
  PRIMARY KEY (`software_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目软件表';

-- ----------------------------
-- Records of project_software
-- ----------------------------
BEGIN;
INSERT INTO `project_software` VALUES (1, '2022-01-05 16:12:53', '2022-01-05 16:12:55', 0, 1, '统一支付软件', '2022-01-12 16:13:17', 0, '这是备注', NULL);
INSERT INTO `project_software` VALUES (2, '2022-01-05 16:13:39', '2022-01-05 16:13:41', 0, 1, '监控系统', '2022-01-12 16:14:00', 1, '已经上线啦', NULL);
COMMIT;

-- ----------------------------
-- Table structure for project_survey
-- ----------------------------
DROP TABLE IF EXISTS `project_survey`;
CREATE TABLE `project_survey` (
  `survey_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目调研主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(3) unsigned DEFAULT '0' COMMENT '删除标识',
  `project_id` int(11) DEFAULT NULL COMMENT '项目id',
  `survey_type` varchar(10) DEFAULT NULL COMMENT '调研类型',
  `status` tinyint(3) unsigned DEFAULT '0' COMMENT '调研状态',
  `remark` varchar(255) DEFAULT NULL COMMENT '状态说明',
  `file_content` text COMMENT '文件内容json',
  PRIMARY KEY (`survey_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目调研表';

-- ----------------------------
-- Records of project_survey
-- ----------------------------
BEGIN;
INSERT INTO `project_survey` VALUES (1, '2022-01-06 10:06:58', '2022-01-08 17:03:06', 0, 1, '现场调研', 0, '这是调研备注', '[{\"url\":\"2\",\"name\":\"1\"},{\"url\":\"bb\",\"name\":\"a\"}]');
INSERT INTO `project_survey` VALUES (2, '2022-01-06 10:07:09', '2022-01-08 17:03:41', 0, 1, '线上沟通', 0, NULL, '');
INSERT INTO `project_survey` VALUES (3, '2022-01-08 16:23:12', '2022-01-08 16:56:59', 0, 1, '现场调研', 0, NULL, '[{\"url\":\"2\",\"name\":\"1\"},{\"url\":\"bb\",\"name\":\"a\"}]');
COMMIT;

-- ----------------------------
-- Table structure for project_task
-- ----------------------------
DROP TABLE IF EXISTS `project_task`;
CREATE TABLE `project_task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目任务主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '删除标识 0未删除 1已删除',
  `project_id` int(11) DEFAULT NULL COMMENT '项目id',
  `creator` varchar(10) DEFAULT NULL COMMENT '创建人',
  `task_name` varchar(50) DEFAULT NULL COMMENT '任务名称',
  `task` varchar(1000) DEFAULT NULL COMMENT '任务内容',
  `status` tinyint(1) DEFAULT '0' COMMENT '任务状态',
  `competence_id` int(11) DEFAULT NULL COMMENT '权限id',
  `user_id` int(11) DEFAULT NULL COMMENT '推送用户id',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of project_task
-- ----------------------------
BEGIN;
INSERT INTO `project_task` VALUES (1, '2022-01-09 22:57:32', '2022-01-09 22:58:20', 0, 1, '这是任务创建人', '这是任务名字', '这是任务内容', 0, 1, 1, '这是备注');
COMMIT;

-- ----------------------------
-- Table structure for project_user
-- ----------------------------
DROP TABLE IF EXISTS `project_user`;
CREATE TABLE `project_user` (
  `project_user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目人员id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '删除标识',
  `project_id` int(11) DEFAULT NULL COMMENT '项目id',
  `username` varchar(10) DEFAULT NULL COMMENT '用户名',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `job` varchar(50) DEFAULT NULL COMMENT '职务',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `notice_type` tinyint(3) unsigned DEFAULT NULL COMMENT '日报接收方式0不接收,1钉钉,2短信 3钉钉加短信',
  `notice_rule` tinyint(3) unsigned DEFAULT NULL COMMENT '通知规则',
  PRIMARY KEY (`project_user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目成员表';

-- ----------------------------
-- Records of project_user
-- ----------------------------
BEGIN;
INSERT INTO `project_user` VALUES (1, '2022-01-09 19:54:15', '2022-01-09 19:55:10', 0, NULL, NULL, NULL, NULL, NULL, NULL, 244);
INSERT INTO `project_user` VALUES (2, '2022-01-09 20:00:55', '2022-01-09 20:00:55', 0, NULL, NULL, NULL, NULL, NULL, 99, 234);
INSERT INTO `project_user` VALUES (3, '2022-01-09 20:01:52', '2022-01-09 20:01:52', 0, NULL, NULL, NULL, NULL, NULL, 0, 234);
COMMIT;

-- ----------------------------
-- Table structure for software_module
-- ----------------------------
DROP TABLE IF EXISTS `software_module`;
CREATE TABLE `software_module` (
  `module_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目软件功能主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` tinyint(4) DEFAULT '0' COMMENT '删除状态',
  `software_id` int(11) DEFAULT NULL COMMENT '项目软件id',
  `module_name` varchar(255) DEFAULT NULL COMMENT '软件模块名称',
  `module_remark` varchar(255) DEFAULT NULL COMMENT '功能描述',
  `status` tinyint(4) DEFAULT '0' COMMENT '状态',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`module_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='项目软件功能点表';

-- ----------------------------
-- Records of software_module
-- ----------------------------
BEGIN;
INSERT INTO `software_module` VALUES (1, '2022-01-05 16:15:08', '2022-01-05 16:15:13', 0, 1, '支付功能', '支付功能描述', 0, '这是支付功能的备注');
INSERT INTO `software_module` VALUES (2, '2022-01-05 16:16:00', '2022-01-05 16:29:33', 0, 1, '退款功能', '退款功能描述', 0, '退款备注');
INSERT INTO `software_module` VALUES (3, '2022-01-05 16:29:23', '2022-01-05 16:30:08', 0, 2, '设备监控功能', '监控功能描述', 0, '监控功能备注');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '内部用户id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `piros_id` int(11) DEFAULT NULL COMMENT 'piros上的用户id',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '删除标识',
  `is_resign` tinyint(1) DEFAULT '0' COMMENT '是否离职',
  `phone` varchar(11) DEFAULT NULL COMMENT '电话号码',
  `job` varchar(20) DEFAULT NULL COMMENT '在职职务',
  `job_type` int(10) unsigned DEFAULT NULL COMMENT '职务类型',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
