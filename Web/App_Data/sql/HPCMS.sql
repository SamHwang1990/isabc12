/****** 对象:  Default [DF_Content_Article_IsGenerate]    脚本日期: 02/17/2013 14:08:32 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Article_IsGenerate]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Article]'))
Begin
ALTER TABLE [dbo].[Content_Article] DROP CONSTRAINT [DF_Content_Article_IsGenerate]

End
GO
/****** 对象:  Default [DF_Content_Node_OpenType]    脚本日期: 02/17/2013 14:08:32 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_OpenType]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] DROP CONSTRAINT [DF_Content_Node_OpenType]

End
GO
/****** 对象:  Default [DF_Content_Node_IndexTemplateID]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_IndexTemplateID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] DROP CONSTRAINT [DF_Content_Node_IndexTemplateID]

End
GO
/****** 对象:  Default [DF_Content_Node_ContentTemplateID]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_ContentTemplateID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] DROP CONSTRAINT [DF_Content_Node_ContentTemplateID]

End
GO
/****** 对象:  Default [DF_Content_Node_SearchTemplateID]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_SearchTemplateID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] DROP CONSTRAINT [DF_Content_Node_SearchTemplateID]

End
GO
/****** 对象:  Default [DF_Content_Node_IsGenerate]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_IsGenerate]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] DROP CONSTRAINT [DF_Content_Node_IsGenerate]

End
GO
/****** 对象:  Default [DF_Content_Node_PageSize]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_PageSize]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] DROP CONSTRAINT [DF_Content_Node_PageSize]

End
GO
/****** 对象:  Default [DF_Content_Template_IsGenerate]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Template_IsGenerate]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Template]'))
Begin
ALTER TABLE [dbo].[Content_Template] DROP CONSTRAINT [DF_Content_Template_IsGenerate]

End
GO
/****** 对象:  Default [DF_Content_TemplateCategory_ParentID]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_TemplateCategory_ParentID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_TemplateCategory]'))
Begin
ALTER TABLE [dbo].[Content_TemplateCategory] DROP CONSTRAINT [DF_Content_TemplateCategory_ParentID]

End
GO
/****** 对象:  Table [dbo].[HP_U_Article]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[HP_U_Article]') AND type in (N'U'))
DROP TABLE [dbo].[HP_U_Article]
GO
/****** 对象:  Table [dbo].[Content_Article]    脚本日期: 02/17/2013 14:08:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Article]') AND type in (N'U'))
DROP TABLE [dbo].[Content_Article]
GO
/****** 对象:  Table [dbo].[Content_Node]    脚本日期: 02/17/2013 14:08:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Node]') AND type in (N'U'))
DROP TABLE [dbo].[Content_Node]
GO
/****** 对象:  Table [dbo].[Content_Tag]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Tag]') AND type in (N'U'))
DROP TABLE [dbo].[Content_Tag]
GO
/****** 对象:  Table [dbo].[Content_TagCategory]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_TagCategory]') AND type in (N'U'))
DROP TABLE [dbo].[Content_TagCategory]
GO
/****** 对象:  Table [dbo].[Sys_Log]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Log]') AND type in (N'U'))
DROP TABLE [dbo].[Sys_Log]
GO
/****** 对象:  Table [dbo].[Content_Model]    脚本日期: 02/17/2013 14:08:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Model]') AND type in (N'U'))
DROP TABLE [dbo].[Content_Model]
GO
/****** 对象:  Table [dbo].[Content_Template]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Template]') AND type in (N'U'))
DROP TABLE [dbo].[Content_Template]
GO
/****** 对象:  Table [dbo].[Content_TemplateCategory]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_TemplateCategory]') AND type in (N'U'))
DROP TABLE [dbo].[Content_TemplateCategory]
GO
/****** 对象:  Table [dbo].[Sys_FunctionValue]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_FunctionValue]') AND type in (N'U'))
DROP TABLE [dbo].[Sys_FunctionValue]
GO
/****** 对象:  Table [dbo].[Sys_Role]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Role]') AND type in (N'U'))
DROP TABLE [dbo].[Sys_Role]
GO
/****** 对象:  Table [dbo].[Sys_Function]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Function]') AND type in (N'U'))
DROP TABLE [dbo].[Sys_Function]
GO
/****** 对象:  Table [dbo].[Sys_Admin]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Admin]') AND type in (N'U'))
DROP TABLE [dbo].[Sys_Admin]
GO
/****** 对象:  Table [dbo].[Sys_Module]    脚本日期: 02/17/2013 14:08:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Module]') AND type in (N'U'))
DROP TABLE [dbo].[Sys_Module]
GO
/****** 对象:  Table [dbo].[Sys_Module]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Module]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Sys_Module](
	[ModuleID] [int] IDENTITY(1,1) NOT NULL,
	[ParentID] [int] NULL,
	[ModuleName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[DefaultUrl] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Sys_Module] PRIMARY KEY CLUSTERED 
(
	[ModuleID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Sys_Module] ON
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (1, 0, N'系统管理', N'', N'系统管理')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (2, 0, N'用户管理', N'', NULL)
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (3, 0, N'内容管理', N'', N'内容管理模块')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (4, 2, N'管理员管理', N'~/Admin/AdminMgr/Default.aspx', NULL)
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (5, 1, N'模块管理', N'~/Admin/ModuleMgr/Default.aspx', N'模块管理')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (6, 1, N'日志管理', N'~/Admin/LogMgr/Default.aspx', N'日志管理')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (7, 3, N'节点管理', N'~/Admin/NodeMgr/Default.aspx', N'节点管理')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (8, 3, N'文章管理', N'~/Admin/ArticleMgr/Default.aspx', N'文章管理模块')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (9, 1, N'标签管理', N'~/Admin/TagMgr/Default.aspx', N'标签管理模块')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (10, 1, N'模板管理', N'~/Admin/TemplateMgr/Default.aspx', N'模板管理模块')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (11, 2, N'角色管理', N'~/Admin/RoleMgr/Default.aspx', N'角色管理模块')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (12, 3, N'模型管理', N'~/Admin/ModelMgr/Default.aspx', N'内容模型管理')
INSERT [dbo].[Sys_Module] ([ModuleID], [ParentID], [ModuleName], [DefaultUrl], [Remark]) VALUES (14, 1, N'风格管理', N'~/Admin/StyleMgr/Default.aspx', N'风格管理')
SET IDENTITY_INSERT [dbo].[Sys_Module] OFF
/****** 对象:  Table [dbo].[Sys_Admin]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Admin]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Sys_Admin](
	[AdminID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [int] NULL,
	[AdminName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Password] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[RegTime] [datetime] NULL,
	[LoginTimes] [int] NULL,
	[LastLoginTime] [datetime] NULL,
	[Status] [bit] NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Sys_Admin] PRIMARY KEY CLUSTERED 
(
	[AdminID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Sys_Admin] ON
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (2, 1, N'admin', N'202CB962AC59075B964B07152D234B70', CAST(0x0000000000000000 AS DateTime), 15, CAST(0x0000A16800E194F4 AS DateTime), 1, N'超级管理员，全部权限；不可删除')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (5, 1, N'黄志源', N'7FEF6171469E80D32C0559F88B377245', CAST(0x0000000000000000 AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 0, N'黄志源')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (6, 2, N'仲芸芸', N'7FEF6171469E80D32C0559F88B377245', CAST(0x0000000000000000 AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 0, N'仲芸芸')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (34, 2, N'江剑锋', N'202CB962AC59075B964B07152D234B70', CAST(0x0000000000000000 AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 0, N'')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (35, 5, N'刘丁如', N'202CB962AC59075B964B07152D234B70', CAST(0x0000000000000000 AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 0, N'刘丁如')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (36, 2, N'何嘉慧', N'202CB962AC59075B964B07152D234B70', CAST(0x0000000000000000 AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 1, N'')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (37, 1, N'郭运桃', N'202CB962AC59075B964B07152D234B70', CAST(0x0000000000000000 AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 1, N'')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (38, 1, N'陈圆浩', N'202CB962AC59075B964B07152D234B70', CAST(0x0000A15E01851E85 AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 1, N'陈圆浩')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (39, 1, N'邓志贤', N'202CB962AC59075B964B07152D234B70', CAST(0x0000A15E01858D9C AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 1, N'')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (40, 1, N'李朝辉', N'202CB962AC59075B964B07152D234B70', CAST(0x0000A15E0186D99E AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 1, N'')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (41, 1, N'罗羡雯', N'202CB962AC59075B964B07152D234B70', CAST(0x0000A15F0004FAA2 AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 1, N'罗羡雯')
INSERT [dbo].[Sys_Admin] ([AdminID], [RoleID], [AdminName], [Password], [RegTime], [LoginTimes], [LastLoginTime], [Status], [Remark]) VALUES (44, 1, N'邱裕红', N'202CB962AC59075B964B07152D234B70', CAST(0x0000A161017EBF1F AS DateTime), 0, CAST(0x0000000000000000 AS DateTime), 1, N'超级管理员邱裕红')
SET IDENTITY_INSERT [dbo].[Sys_Admin] OFF
/****** 对象:  Table [dbo].[Sys_Function]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Function]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Sys_Function](
	[FunctionID] [int] IDENTITY(1,1) NOT NULL,
	[ModuleID] [int] NULL,
	[FunctionName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[FunctionKey] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[FunctionValue] [int] NULL,
	[DefaultUrl] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Sys_Function] PRIMARY KEY CLUSTERED 
(
	[FunctionID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Sys_Function] ON
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (2, 4, N'查看管理员页面', N'List', 1, N'~/Admin/AdminMgr/Default.aspx', N'查看管理员列表页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (3, 4, N'查看管理员实现', N'List', 1, N'~/Admin/AdminMgr/GetAdminList.aspx', N'查看管理员实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (4, 4, N'添加管理员', N'Add', 2, N'~/Admin/AdminMgr/AddAdmin.aspx', N'添加管理员')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (5, 4, N'编辑管理员', N'Edit', 4, N'~/Admin/AdminMgr/EditAdmin.aspx', N'编辑管理员')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (6, 4, N'删除管理员', N'Delete', 8, N'~/Admin/AdminMgr/DeleteAdmin.aspx', N'编辑模块')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (7, 11, N'查看角色页面', N'List', 1, N'~/Admin/RoleMgr/Default.aspx', N'查看角色页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (8, 11, N'查看角色页面实现', N'List', 1, N'~/Admin/RoleMgr/GetRoleList.aspx', N'查看角色页面实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (9, 11, N'添加角色', N'Add', 2, N'~/Admin/RoleMgr/AddRole.aspx', N'添加角色')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (10, 11, N'编辑角色', N'Edit', 4, N'~/Admin/RoleMgr/EditRole.aspx', N'编辑角色')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (11, 11, N'删除角色', N'Delete', 8, N'~/Admin/RoleMgr/DeleteRole.aspx', N'删除角色')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (12, 11, N'分配权限', N'Modify', 16, N'~/Admin/RoleMgr/GetRightTree.aspx', N'分配权限')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (13, 6, N'查看日志页面', N'List', 1, N'~/Admin/LogMgr/Default.aspx', N'查看日志页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (14, 6, N'查看日志页面实现', N'List', 1, N'~/Admin/LogMgr/GetLogList.aspx', N'查看日志页面实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (15, 6, N'添加日志', N'Add', 2, N'~/Admin/LogMgr/AddLog.aspx', N'添加日志')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (16, 6, N'编辑日志', N'Edit', 4, N'~/Admin/LogMgr/EditLog.aspx', N'编辑日志')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (17, 6, N'删除日志', N'Delete', 8, N'~/Admin/LogMgr/DeleteLog.aspx', N'删除日志')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (18, 5, N'查看模块管理页面', N'List', 1, N'~/Admin/ModuleMgr/Default.aspx', N'查看模块管理页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (19, 5, N'查看模块管理页面实现', N'List', 1, N'~/Admin/ModuleMgr/GetModuleList.aspx', N'查看模块管理页面实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (20, 5, N'查看模块管理树', N'Edit', 1, N'~/Admin/ModuleMgr/GetModuleTree.aspx', N'查看模块管理树')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (21, 5, N'查看模块信息', N'View', 1, N'~/Admin/ModuleMgr/GetModuleInfo.aspx', N'查看模块信息')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (22, 5, N'添加模块', N'Add', 2, N'~/Admin/ModuleMgr/AddModule.aspx', N'添加模块')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (23, 5, N'编辑模块', N'Edit', 4, N'~/Admin/ModuleMgr/EditModule.aspx', N'编辑模块')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (24, 5, N'删除模块', N'Delete', 8, N'~/Admin/ModuleMgr/DeleteModule.aspx', N'删除模块')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (25, 12, N'查看模型页面', N'List', 1, N'~/Admin/ModelMgr/Default.aspx', N'查看模型页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (26, 12, N'查看模型页面实现', N'List', 1, N'~/Admin/ModelMgr/GetModuleList.aspx', N'查看模型页面实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (27, 12, N'添加模型', N'Add', 2, N'~/Admin/ModelMgr/AddModel.aspx', N'添加模型')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (29, 12, N'编辑模型', N'Edit', 4, N'~/Admin/ModelMgr/EditModel.aspx', N'编辑模型')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (30, 12, N'删除模型', N'Delete', 8, N'~/Admin/ModelMgr/DeleteModel.aspx', N'删除模型')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (38, 5, N'查看功能页面', N'List', 1, N'~/Admin/FunctionMgr/Default.aspx', N'查看功能页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (39, 5, N'查看功能页面实现', N'List', 1, N'~/Admin/FunctionMgr/GetFunctionList.aspx', N'查看功能页面实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (40, 5, N'查看功能树', N'Tree', 1, N'~/Admin/FunctionMgr/GetFunctionTree.aspx', N'查看功能树')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (41, 5, N'添加功能', N'Add', 2, N'~/Admin/FunctionMgr/AddFunction.aspx', N'添加功能')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (42, 5, N'编辑功能', N'Edit', 4, N'~/Admin/FunctionMgr/EditFunction.aspx', N'编辑功能')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (43, 5, N'删除功能', N'Delete', 8, N'~/Admin/FunctionMgr/DeleteFunction.aspx', N'删除功能')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (44, 7, N'查看节点页面', N'List', 1, N'~/Admin/NodeMgr/Default.aspx', N'查看节点页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (45, 7, N'查看节点页面实现', N'List', 1, N'~/Admin/NodeMgr/GetNodeList.aspx', N'查看节点页面实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (46, 7, N'查看节点树', N'List', 1, N'~/Admin/NodeMgr/GetNodeTree.aspx', N'查看节点树')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (47, 7, N'查看节点信息页面', N'View', 1, N'~/Admin/NodeMgr/NodeInfo.aspx', N'查看节点信息页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (48, 7, N'查看节点信息页面实现', N'View', 1, N'~/Admin/NodeMgr/GetNodeInfo.aspx', N'查看节点信息页面实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (49, 7, N'添加节点', N'Add', 2, N'~/Admin/NodeMgr/AddNode.aspx', N'添加节点')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (50, 7, N'编辑节点基本信息', N'Edit', 4, N'~/Admin/NodeMgr/EditBasic.aspx', N'编辑节点基本信息')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (51, 7, N'编辑节点选项', N'Edit', 4, N'~/Admin/NodeMgr/EditSetting.aspx', N'编辑节点选项')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (52, 7, N'编辑模板选项', N'Edit', 4, N'~/Admin/NodeMgr/EditTemplateSetting.aspx', N'编辑模板选项')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (53, 7, N'删除节点', N'Delete', 8, N'~/Admin/NodeMgr/DeleteNode.aspx', N'删除节点')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (54, 10, N'查看模板管理页面', N'List', 1, N'~/Admin/TemplateMgr/Default.aspx', N'查看模板管理页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (55, 10, N'查看模板列表实现', N'List', 1, N'~/Admin/TemplateMgr/GetTemplateList.aspx', N'查看模板列表实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (56, 10, N'查看模板分类列表', N'List', 1, N'~/Admin/TemplateMgr/GetTemplateCategoryList.aspx', N'查看模板分类列表')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (57, 10, N'查看模板分类列表2', N'List', 1, N'~/Admin/TemplateMgr/GetTemplateCategoryList2.aspx', N'查看模板分类列表2')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (58, 10, N'查看模板分类树', N'List', 1, N'~/Admin/TemplateMgr/GetTemplateCategoryTree.aspx', N'查看模板分类树')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (59, 10, N'查看模板分类信息', N'View', 1, N'~/Admin/TemplateMgr/GetTemplateCategoryInfo.aspx', N'查看模板分类信息')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (60, 10, N'添加模板', N'Add', 2, N'~/Admin/TemplateMgr/AddTemplate.aspx', N'添加模板')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (61, 10, N'添加模板分类', N'Add', 2, N'~/Admin/TemplateMgr/AddTemplateCategory.aspx', N'添加模板分类')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (62, 10, N'编辑模板', N'Edit', 4, N'~/Admin/TemplateMgr/EditTemplate.aspx', N'编辑模板')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (63, 10, N'编辑模板分类', N'Edit', 4, N'~/Admin/TemplateMgr/EditTemplateCategory.aspx', N'编辑模板分类')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (64, 10, N'删除模板', N'Delete', 8, N'~/Admin/TemplateMgr/DeleteTemplate.aspx', N'删除模板')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (65, 10, N'删除模板分类', N'Delete', 8, N'~/Admin/TemplateMgr/DeleteTemplateCategory.aspx', N'删除模板分类')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (66, 8, N'查看文章列表页面', N'List', 1, N'~/Admin/ArticleMgr/Default.aspx', N'查看文章列表页面')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (67, 8, N'查看文章列表页面实现', N'List', 1, N'~/Admin/ArticleMgr/GetArticleList.aspx', N'查看文章列表页面实现')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (68, 10, N'查看模板信息', N'View', 1, N'~/Admin/TemplateMgr/GetTemplateInfo.aspx', N'查看模板信息')
INSERT [dbo].[Sys_Function] ([FunctionID], [ModuleID], [FunctionName], [FunctionKey], [FunctionValue], [DefaultUrl], [Remark]) VALUES (69, 8, N'添加文章', N'Add', 2, N'~/Admin/ArticleMgr/AddArticle.aspx', N'添加文章')
SET IDENTITY_INSERT [dbo].[Sys_Function] OFF
/****** 对象:  Table [dbo].[Sys_Role]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Role]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Sys_Role](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Status] [bit] NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Sys_Role] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Sys_Role] ON
INSERT [dbo].[Sys_Role] ([RoleID], [RoleName], [Status], [Remark]) VALUES (1, N'超级管理员', 1, N'超级管理员，最高权限')
INSERT [dbo].[Sys_Role] ([RoleID], [RoleName], [Status], [Remark]) VALUES (2, N'系统管理员', 0, N'部分权限')
INSERT [dbo].[Sys_Role] ([RoleID], [RoleName], [Status], [Remark]) VALUES (3, N'编辑', 0, N'文章编辑角色')
INSERT [dbo].[Sys_Role] ([RoleID], [RoleName], [Status], [Remark]) VALUES (5, N'文章校对', 0, N'文章校对')
SET IDENTITY_INSERT [dbo].[Sys_Role] OFF
/****** 对象:  Table [dbo].[Sys_FunctionValue]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_FunctionValue]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Sys_FunctionValue](
	[ValueID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [int] NULL,
	[ModuleID] [int] NULL,
	[FunctionValues] [int] NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Sys_FunctionValue] PRIMARY KEY CLUSTERED 
(
	[ValueID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Sys_FunctionValue] ON
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (1, 1, 5, 15, N'模块管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (2, 1, 6, 15, N'日志管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (3, 1, 7, 15, N'节点管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (4, 1, 10, 15, N'模板管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (5, 1, 11, 31, N'角色管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (6, 1, 1, 1, N'系统配置')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (7, 1, 2, 1, N'用户管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (8, 1, 3, 1, N'内容管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (9, 1, 4, 15, N'管理员管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (10, 1, 11, 31, N'角色管理')
INSERT [dbo].[Sys_FunctionValue] ([ValueID], [RoleID], [ModuleID], [FunctionValues], [Remark]) VALUES (11, 1, 8, 15, N'文章管理')
SET IDENTITY_INSERT [dbo].[Sys_FunctionValue] OFF
/****** 对象:  Table [dbo].[Content_TemplateCategory]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_TemplateCategory]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Content_TemplateCategory](
	[TemplateCategoryID] [int] IDENTITY(1,1) NOT NULL,
	[ParentID] [int] NULL,
	[TemplateCategoryName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[DirName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Content_TemplateCategory] PRIMARY KEY CLUSTERED 
(
	[TemplateCategoryID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Content_TemplateCategory] ON
INSERT [dbo].[Content_TemplateCategory] ([TemplateCategoryID], [ParentID], [TemplateCategoryName], [DirName], [Remark]) VALUES (1, 0, N'首页模板', N'Index', N'首页模板')
INSERT [dbo].[Content_TemplateCategory] ([TemplateCategoryID], [ParentID], [TemplateCategoryName], [DirName], [Remark]) VALUES (2, 0, N'栏目页模板', N'Column', N'栏目页模板')
INSERT [dbo].[Content_TemplateCategory] ([TemplateCategoryID], [ParentID], [TemplateCategoryName], [DirName], [Remark]) VALUES (3, 0, N'内容页模板', N'Content', N'内容页模板')
INSERT [dbo].[Content_TemplateCategory] ([TemplateCategoryID], [ParentID], [TemplateCategoryName], [DirName], [Remark]) VALUES (5, 0, N'搜索页模板', N'Search', N'搜索页模板')
SET IDENTITY_INSERT [dbo].[Content_TemplateCategory] OFF
/****** 对象:  Table [dbo].[Content_Template]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Template]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Content_Template](
	[TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryID] [int] NULL,
	[TemplateName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[TemplateContent] [ntext] COLLATE Chinese_PRC_CI_AS NULL,
	[FileName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[IsGenerate] [bit] NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Content_Template] PRIMARY KEY CLUSTERED 
(
	[TemplateID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Content_Template] ON
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (1, 1, N'默认首页模板', N'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>HPCMS默认首页</title>
</head>
<body>
<ul>	
#foreach($node in ${HopeTag.GetSubNodes()})
<li>
<a href="${HopeTag.GetNodeUrl($node)}">$node.NodeName</a>
</li>
#end
</ul>
<h3>${HopeTag.GetCopyright()}</h3>
</body>
</html>', N'Default.html', 1, N'默认首页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (2, 1, N'厚朴工作室首页模板', N'厚朴工作室首页模板', N'Hope.html', 1, N'厚朴工作室首页模板2013')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (3, 1, N'药学院首页模板', N'药学院首页模板', N'sps.html', 1, N'药学院首页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (4, 5, N'默认搜索页模板', N'默认搜索页模板', N'Default.html', 1, N'默认搜索页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (5, 2, N'默认栏目页模板', N'#foreach($subNode in ${HopeTag.GetSubNodes()})
$subNode.NodeName
#end', N'Default.html', 1, N'默认栏目页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (6, 1, N'法学院首页模板', N'法学院首页模板', N'law.html', 1, N'法学院首页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (11, 1, N'传播学院首页模板', N'<b>传播学院首页模板</b>', N'SCD.html', 1, N'传播学院首页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (12, 3, N'默认内容页模板', N'<b>​默认内容页模板</b>', N'Content.html', 1, N'默认内容页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (13, 1, N'学院首页模板', N'学院首页模板', N'ce.html', 1, N'学院首页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (14, 2, N'药学院栏目页模板', N'药学院栏目页模板', N'sps_column.html', 1, N'药学院栏目页模板')
INSERT [dbo].[Content_Template] ([TemplateID], [CategoryID], [TemplateName], [TemplateContent], [FileName], [IsGenerate], [Remark]) VALUES (15, 1, N'个人首页模板', N'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
</head>
<body>	
#foreach($node in ${HopeTag.GetSubNodes()})
<a href="${HopeTag.GetCurrentNodeUrl()}">$node.NodeName</a>
#end
</body>
</html>', N'personal.html', 1, N'')
SET IDENTITY_INSERT [dbo].[Content_Template] OFF
/****** 对象:  Table [dbo].[Content_Model]    脚本日期: 02/17/2013 14:08:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Model]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Content_Model](
	[ModelID] [int] IDENTITY(1,1) NOT NULL,
	[ModelName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[TableName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[ItemName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[ItemUnit] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Content_Model] PRIMARY KEY CLUSTERED 
(
	[ModelID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Content_Model] ON
INSERT [dbo].[Content_Model] ([ModelID], [ModelName], [TableName], [ItemName], [ItemUnit], [Remark]) VALUES (1, N'文章模型', N'Hope_U_Article', N'文章', N'篇', N'文章内容模型')
INSERT [dbo].[Content_Model] ([ModelID], [ModelName], [TableName], [ItemName], [ItemUnit], [Remark]) VALUES (3, N'图书模型', N'Hope_U_Book', N'图书', N'本', N'图书模型')
SET IDENTITY_INSERT [dbo].[Content_Model] OFF
/****** 对象:  Table [dbo].[Sys_Log]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sys_Log]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Sys_Log](
	[LogID] [bigint] IDENTITY(1,1) NOT NULL,
	[Account] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Title] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Message] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
	[Time] [datetime] NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Sys_Log] PRIMARY KEY CLUSTERED 
(
	[LogID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
SET IDENTITY_INSERT [dbo].[Sys_Log] ON
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (1, N'admin', N'登录密码错误', N'登录密码错误', CAST(0x0000A16101212750 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (2, N'admin', N'登录密码错误', N'登录密码错误', CAST(0x0000A161012B7076 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (3, N'admin', N'登录密码错误', N'登录密码错误', CAST(0x0000A161012B76A2 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (4, N'admin', N'登录成功', N'登录成功', CAST(0x0000A161012BBA0D AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (5, N'admin', N'登录成功', N'登录成功', CAST(0x0000A1610132D79A AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (6, N'admin', N'登录成功', N'登录成功', CAST(0x0000A1610133D267 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (7, N'admin', N'登录成功', N'登录成功', CAST(0x0000A1610165FE10 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (8, N'admin', N'登录成功', N'登录成功', CAST(0x0000A161016D21C9 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (9, N'admin', N'登录成功', N'登录成功', CAST(0x0000A161016FE256 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (10, N'admin', N'登录成功', N'登录成功', CAST(0x0000A161017373AF AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (11, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16101744F10 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (12, N'admin', N'登录成功', N'登录成功', CAST(0x0000A161017613E2 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (13, N'admin', N'登录成功', N'登录成功', CAST(0x0000A161017B152A AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (14, N'admin', N'登录成功', N'登录成功', CAST(0x0000A161017E177D AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (15, N'admin', N'登录成功', N'登录成功', CAST(0x0000A1620006279F AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (16, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16200FF37F8 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (17, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16201007F74 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (18, N'admin', N'登录成功', N'登录成功', CAST(0x0000A162013CEDBE AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (19, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16201460207 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (20, N'admin', N'登录成功', N'登录成功', CAST(0x0000A1620152E90C AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (21, N'admin', N'登录成功', N'登录成功', CAST(0x0000A162015344B6 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (22, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16201564D18 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (23, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16201886B3E AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (24, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16300BBF466 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (25, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16300DB6681 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (26, N'admin', N'登录密码错误', N'登录密码错误', CAST(0x0000A16300DEE683 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (27, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16300DEEAA2 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (28, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16300DF4BAE AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (29, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16300E2D38F AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (30, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16300E5B737 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (31, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16300EC29FC AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (32, N'admin', N'登录成功', N'登录成功', CAST(0x0000A1630114991B AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (33, N'admin', N'登录成功', N'登录成功', CAST(0x0000A163012A832A AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (34, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16301327905 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (35, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16301691F81 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (36, N'admin', N'登录成功', N'登录成功', CAST(0x0000A164014B0DFB AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (37, N'admin', N'登录成功', N'登录成功', CAST(0x0000A164015046B4 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (38, N'admin', N'登录成功', N'登录成功', CAST(0x0000A164015894B4 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (39, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700BFE741 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (40, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700C3405E AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (41, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700C5E7F7 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (42, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700D64090 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (43, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700D9375E AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (44, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700E30879 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (45, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700F7359B AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (46, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700F7A1CD AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (47, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16700FB5556 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (48, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16701088294 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (49, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16701161636 AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (50, N'admin', N'登录成功', N'登录成功', CAST(0x0000A1670139D16D AS DateTime), N'')
INSERT [dbo].[Sys_Log] ([LogID], [Account], [Title], [Message], [Time], [Remark]) VALUES (51, N'admin', N'登录成功', N'登录成功', CAST(0x0000A16800E19528 AS DateTime), N'')
SET IDENTITY_INSERT [dbo].[Sys_Log] OFF
/****** 对象:  Table [dbo].[Content_TagCategory]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_TagCategory]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Content_TagCategory](
	[TagCategoryID] [int] IDENTITY(1,1) NOT NULL,
	[ParentID] [int] NULL,
	[TagCategoryName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[DirName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Content_TagCategory] PRIMARY KEY CLUSTERED 
(
	[TagCategoryID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
/****** 对象:  Table [dbo].[Content_Tag]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Tag]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Content_Tag](
	[TagID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryID] [int] NULL,
	[TagName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[TagContent] [ntext] COLLATE Chinese_PRC_CI_AS NULL,
	[FileName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[IsGenerate] [bit] NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Content_Tag] PRIMARY KEY CLUSTERED 
(
	[TagID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
/****** 对象:  Table [dbo].[Content_Node]    脚本日期: 02/17/2013 14:08:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Node]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Content_Node](
	[NodeID] [int] IDENTITY(1,1) NOT NULL,
	[ParentID] [int] NULL,
	[NodeName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[NodeEnName] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[DirName] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
	[OpenType] [bit] NULL,
	[ModelID] [int] NULL,
	[IndexTemplateID] [int] NULL,
	[ContentTemplateID] [int] NULL,
	[SearchTemplateID] [int] NULL,
	[IsGenerate] [bit] NULL,
	[GenerateRegex] [int] NULL,
	[PageSize] [int] NULL,
	[Meta] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Content_Node] PRIMARY KEY CLUSTERED 
(
	[NodeID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'True代表原窗口打开，False代表新窗口打开' ,@level0type=N'SCHEMA', @level0name=N'dbo', @level1type=N'TABLE', @level1name=N'Content_Node', @level2type=N'COLUMN', @level2name=N'OpenType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否生成静态页' ,@level0type=N'SCHEMA', @level0name=N'dbo', @level1type=N'TABLE', @level1name=N'Content_Node', @level2type=N'COLUMN', @level2name=N'IsGenerate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'生成静态页的规则' ,@level0type=N'SCHEMA', @level0name=N'dbo', @level1type=N'TABLE', @level1name=N'Content_Node', @level2type=N'COLUMN', @level2name=N'GenerateRegex'
GO
SET IDENTITY_INSERT [dbo].[Content_Node] ON
INSERT [dbo].[Content_Node] ([NodeID], [ParentID], [NodeName], [NodeEnName], [DirName], [OpenType], [ModelID], [IndexTemplateID], [ContentTemplateID], [SearchTemplateID], [IsGenerate], [GenerateRegex], [PageSize], [Meta], [Remark]) VALUES (1, 0, N'首页', N'Index', N'Index', 0, 1, 1, 12, 4, 0, NULL, 0, N'HPCMS，厚朴编程组，内容管理系统，CMS', N'网站首页，不可删除')
INSERT [dbo].[Content_Node] ([NodeID], [ParentID], [NodeName], [NodeEnName], [DirName], [OpenType], [ModelID], [IndexTemplateID], [ContentTemplateID], [SearchTemplateID], [IsGenerate], [GenerateRegex], [PageSize], [Meta], [Remark]) VALUES (2, 1, N'新闻中心', N'News Center', N'', 0, 0, 5, 0, 0, 0, NULL, 0, N'新闻中心', N'新闻中心节点')
INSERT [dbo].[Content_Node] ([NodeID], [ParentID], [NodeName], [NodeEnName], [DirName], [OpenType], [ModelID], [IndexTemplateID], [ContentTemplateID], [SearchTemplateID], [IsGenerate], [GenerateRegex], [PageSize], [Meta], [Remark]) VALUES (3, 2, N'厚朴新闻', N'Hope News', N'', 1, 1, 1, 12, 4, 0, -1, 20, N'HPCMS，厚朴编程组，新闻，CMS', N'厚朴新闻节点')
INSERT [dbo].[Content_Node] ([NodeID], [ParentID], [NodeName], [NodeEnName], [DirName], [OpenType], [ModelID], [IndexTemplateID], [ContentTemplateID], [SearchTemplateID], [IsGenerate], [GenerateRegex], [PageSize], [Meta], [Remark]) VALUES (4, 1, N'厚朴教育', N'Hope Edu', N'', 0, 0, 5, 0, 0, 0, NULL, 0, N'', N'厚朴教育一级栏目')
INSERT [dbo].[Content_Node] ([NodeID], [ParentID], [NodeName], [NodeEnName], [DirName], [OpenType], [ModelID], [IndexTemplateID], [ContentTemplateID], [SearchTemplateID], [IsGenerate], [GenerateRegex], [PageSize], [Meta], [Remark]) VALUES (5, 4, N'成长档案', N'', N'', 0, 1, 2, 5, 4, 0, NULL, 15, N'HPCMS，厚朴编程组，CMS，内容管理系统，成长档案', N'成长档案节点')
INSERT [dbo].[Content_Node] ([NodeID], [ParentID], [NodeName], [NodeEnName], [DirName], [OpenType], [ModelID], [IndexTemplateID], [ContentTemplateID], [SearchTemplateID], [IsGenerate], [GenerateRegex], [PageSize], [Meta], [Remark]) VALUES (8, 9, N'厚朴足迹', N'', N'', 1, 1, 6, 0, 0, 0, -1, 20, N'', N'厚朴足迹')
INSERT [dbo].[Content_Node] ([NodeID], [ParentID], [NodeName], [NodeEnName], [DirName], [OpenType], [ModelID], [IndexTemplateID], [ContentTemplateID], [SearchTemplateID], [IsGenerate], [GenerateRegex], [PageSize], [Meta], [Remark]) VALUES (9, 1, N'厚朴日志', N'', N'', 0, 0, 3, 0, 0, 0, -1, 0, N'', N'厚朴日志')
INSERT [dbo].[Content_Node] ([NodeID], [ParentID], [NodeName], [NodeEnName], [DirName], [OpenType], [ModelID], [IndexTemplateID], [ContentTemplateID], [SearchTemplateID], [IsGenerate], [GenerateRegex], [PageSize], [Meta], [Remark]) VALUES (10, 4, N'编程开发', N'RND', N'rnd', 1, 1, 5, 0, 4, 0, NULL, 15, N'编程开发', N'编程开发')
SET IDENTITY_INSERT [dbo].[Content_Node] OFF
/****** 对象:  Table [dbo].[Content_Article]    脚本日期: 02/17/2013 14:08:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Content_Article]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Content_Article](
	[GeneralID] [int] IDENTITY(1,1) NOT NULL,
	[NodeID] [int] NULL,
	[ItemID] [int] NULL,
	[Title] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
	[Inputor] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Editor] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[Hits] [int] NULL,
	[CreateTime] [datetime] NULL,
	[UpdateTime] [datetime] NULL,
	[Status] [int] NULL,
	[IsGenerate] [bit] NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_Content_Article] PRIMARY KEY CLUSTERED 
(
	[GeneralID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'文章状态，0表示草稿，1表示待审核，2表示终身通过正常显示，3表示归档' ,@level0type=N'SCHEMA', @level0name=N'dbo', @level1type=N'TABLE', @level1name=N'Content_Article', @level2type=N'COLUMN', @level2name=N'Status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否已经生成' ,@level0type=N'SCHEMA', @level0name=N'dbo', @level1type=N'TABLE', @level1name=N'Content_Article', @level2type=N'COLUMN', @level2name=N'IsGenerate'
GO
SET IDENTITY_INSERT [dbo].[Content_Article] ON
INSERT [dbo].[Content_Article] ([GeneralID], [NodeID], [ItemID], [Title], [Inputor], [Editor], [Hits], [CreateTime], [UpdateTime], [Status], [IsGenerate], [Remark]) VALUES (1, 3, NULL, N'HPCMS内容管理系统V0.1.1正式发布', N'admin', N'admin', 0, NULL, NULL, 2, 0, N'HPCMS内容管理系统V0.1.1正式发布')
INSERT [dbo].[Content_Article] ([GeneralID], [NodeID], [ItemID], [Title], [Inputor], [Editor], [Hits], [CreateTime], [UpdateTime], [Status], [IsGenerate], [Remark]) VALUES (2, 3, NULL, N'HPCMS内容管理系统V0.1.2正式发布', N'', N'', 0, CAST(0x0000A167011C5C77 AS DateTime), CAST(0x0000A167011C5C77 AS DateTime), 0, 0, N'')
INSERT [dbo].[Content_Article] ([GeneralID], [NodeID], [ItemID], [Title], [Inputor], [Editor], [Hits], [CreateTime], [UpdateTime], [Status], [IsGenerate], [Remark]) VALUES (3, 3, NULL, N'测试文章，测试文章', N'', N'', 0, CAST(0x0000A167011D36EE AS DateTime), CAST(0x0000A167011D36EE AS DateTime), 0, 0, N'')
INSERT [dbo].[Content_Article] ([GeneralID], [NodeID], [ItemID], [Title], [Inputor], [Editor], [Hits], [CreateTime], [UpdateTime], [Status], [IsGenerate], [Remark]) VALUES (4, 5, NULL, N'测试测试', N'', N'', 0, CAST(0x0000A167013A2CC7 AS DateTime), CAST(0x0000A167013A2CC7 AS DateTime), 0, 0, N'')
SET IDENTITY_INSERT [dbo].[Content_Article] OFF
/****** 对象:  Table [dbo].[HP_U_Article]    脚本日期: 02/17/2013 14:08:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[HP_U_Article]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[HP_U_Article](
	[ArticleID] [int] IDENTITY(1,1) NOT NULL,
	[Content] [ntext] COLLATE Chinese_PRC_CI_AS NULL,
	[SubTitle] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
	[Author] [nvarchar](50) COLLATE Chinese_PRC_CI_AS NULL,
	[CopyFrom] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
	[Remark] [nvarchar](255) COLLATE Chinese_PRC_CI_AS NULL,
 CONSTRAINT [PK_HP_U_Article] PRIMARY KEY CLUSTERED 
(
	[ArticleID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
END
GO
/****** 对象:  Default [DF_Content_Article_IsGenerate]    脚本日期: 02/17/2013 14:08:32 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Article_IsGenerate]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Article]'))
Begin
ALTER TABLE [dbo].[Content_Article] ADD  CONSTRAINT [DF_Content_Article_IsGenerate]  DEFAULT ((0)) FOR [IsGenerate]

End
GO
/****** 对象:  Default [DF_Content_Node_OpenType]    脚本日期: 02/17/2013 14:08:32 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_OpenType]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] ADD  CONSTRAINT [DF_Content_Node_OpenType]  DEFAULT ((1)) FOR [OpenType]

End
GO
/****** 对象:  Default [DF_Content_Node_IndexTemplateID]    脚本日期: 02/17/2013 14:08:33 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_IndexTemplateID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] ADD  CONSTRAINT [DF_Content_Node_IndexTemplateID]  DEFAULT ((0)) FOR [IndexTemplateID]

End
GO
/****** 对象:  Default [DF_Content_Node_ContentTemplateID]    脚本日期: 02/17/2013 14:08:33 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_ContentTemplateID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] ADD  CONSTRAINT [DF_Content_Node_ContentTemplateID]  DEFAULT ((0)) FOR [ContentTemplateID]

End
GO
/****** 对象:  Default [DF_Content_Node_SearchTemplateID]    脚本日期: 02/17/2013 14:08:33 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_SearchTemplateID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] ADD  CONSTRAINT [DF_Content_Node_SearchTemplateID]  DEFAULT ((0)) FOR [SearchTemplateID]

End
GO
/****** 对象:  Default [DF_Content_Node_IsGenerate]    脚本日期: 02/17/2013 14:08:33 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_IsGenerate]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] ADD  CONSTRAINT [DF_Content_Node_IsGenerate]  DEFAULT ((0)) FOR [IsGenerate]

End
GO
/****** 对象:  Default [DF_Content_Node_PageSize]    脚本日期: 02/17/2013 14:08:33 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Node_PageSize]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Node]'))
Begin
ALTER TABLE [dbo].[Content_Node] ADD  CONSTRAINT [DF_Content_Node_PageSize]  DEFAULT ((0)) FOR [PageSize]

End
GO
/****** 对象:  Default [DF_Content_Template_IsGenerate]    脚本日期: 02/17/2013 14:08:33 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_Template_IsGenerate]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_Template]'))
Begin
ALTER TABLE [dbo].[Content_Template] ADD  CONSTRAINT [DF_Content_Template_IsGenerate]  DEFAULT ((0)) FOR [IsGenerate]

End
GO
/****** 对象:  Default [DF_Content_TemplateCategory_ParentID]    脚本日期: 02/17/2013 14:08:33 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_Content_TemplateCategory_ParentID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Content_TemplateCategory]'))
Begin
ALTER TABLE [dbo].[Content_TemplateCategory] ADD  CONSTRAINT [DF_Content_TemplateCategory_ParentID]  DEFAULT ((0)) FOR [ParentID]

End
GO
