USE [master]
GO
/****** Objeto:  Database [respetcure]    Data do Script: 04/05/2026 11:36:57 ******/
CREATE DATABASE [respetcure]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'respetcure', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\respetcure.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON
( NAME = N'respetcure_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\respetcure_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [respetcure] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [respetcure].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [respetcure] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [respetcure] SET ANSI_NULLS OFF
GO
ALTER DATABASE [respetcure] SET ANSI_PADDING OFF
GO
ALTER DATABASE [respetcure] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [respetcure] SET ARITHABORT OFF
GO
ALTER DATABASE [respetcure] SET AUTO_CLOSE ON
GO
ALTER DATABASE [respetcure] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [respetcure] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [respetcure] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [respetcure] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [respetcure] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [respetcure] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [respetcure] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [respetcure] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [respetcure] SET  ENABLE_BROKER
GO
ALTER DATABASE [respetcure] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [respetcure] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [respetcure] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [respetcure] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [respetcure] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [respetcure] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [respetcure] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [respetcure] SET RECOVERY SIMPLE
GO
ALTER DATABASE [respetcure] SET  MULTI_USER
GO
ALTER DATABASE [respetcure] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [respetcure] SET DB_CHAINING OFF
GO
ALTER DATABASE [respetcure] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF )
GO
ALTER DATABASE [respetcure] SET TARGET_RECOVERY_TIME = 60 SECONDS
GO
ALTER DATABASE [respetcure] SET DELAYED_DURABILITY = DISABLED
GO
ALTER DATABASE [respetcure] SET ACCELERATED_DATABASE_RECOVERY = OFF
GO
ALTER DATABASE [respetcure] SET QUERY_STORE = ON
GO
ALTER DATABASE [respetcure] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [respetcure]
GO
/****** Objeto:  Table [dbo].[administrador]    Data do Script: 04/05/2026 11:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[administrador](
    [usuario_id] [int] NOT NULL,
     CONSTRAINT [pk_administrador] PRIMARY KEY CLUSTERED
    (
[usuario_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[anuncio]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[anuncio](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [id_usuario] [int] NOT NULL,
    [status_id] [int] NOT NULL,
    CONSTRAINT [pk_anuncio] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[anuncio_achados_perdidos]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[anuncio_achados_perdidos](
    [id] [int] NOT NULL,
    [situacao_id] [int] NOT NULL,
    [tipo_id] [int] NOT NULL,
    [pet_id] [int] NOT NULL,
    [contato_id] [int] NOT NULL,
    [localizacao] [geography] NOT NULL,
     CONSTRAINT [pk_anuncio_achados_perdidos] PRIMARY KEY CLUSTERED
    (
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[anuncio_adocao]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[anuncio_adocao](
    [id] [int] NOT NULL,
    [pet_id] [int] NOT NULL,
    [contato_id] [int] NOT NULL,
    [temperamento_id] [int] NULL,
    [convive_criancas] [bit] NULL,
    [convive_pets] [bit] NULL,
    [desmamado] [bit] NULL,
    [vacinado] [bit] NULL,
    [vermifugado] [bit] NULL,
    [castrado] [bit] NULL,
    [vacinas] [varchar](255) NULL,
    [data_vacina] [date] NULL,
    [descricao] [varchar](255) NULL,
    CONSTRAINT [pk_anuncio_adocao] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[contato]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[contato](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [nome] [varchar](100) NOT NULL,
    [cidade] [varchar](100) NOT NULL,
    [uf] [char](2) NOT NULL,
    [numero_celular] [varchar](20) NULL,
    [email] [varchar](100) NOT NULL,
    CONSTRAINT [pk_contato] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[dominio_especie]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[dominio_especie](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [descricao] [varchar](20) NOT NULL,
    CONSTRAINT [pk_dominio_especie] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[dominio_porte]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[dominio_porte](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [descricao] [varchar](20) NOT NULL,
    CONSTRAINT [pk_dominio_porte] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[dominio_sexo]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[dominio_sexo](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [descricao] [varchar](30) NOT NULL,
    CONSTRAINT [pk_dominio_sexo] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[dominio_situacao]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[dominio_situacao](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [descricao] [varchar](30) NOT NULL,
    CONSTRAINT [pk_dominio_situacao] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[dominio_status]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[dominio_status](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [descricao] [varchar](20) NOT NULL,
    CONSTRAINT [pk_dominio_status] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[dominio_temperamento]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[dominio_temperamento](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [descricao] [varchar](30) NOT NULL,
    CONSTRAINT [pk_dominio_temperamento] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[dominio_tipo]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[dominio_tipo](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [descricao] [varchar](20) NOT NULL,
    CONSTRAINT [pk_dominio_tipo] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[dominio_uf]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[dominio_uf](
    [sigla] [char](2) NOT NULL,
    [descricao] [varchar](30) NOT NULL,
    CONSTRAINT [pk_dominio_uf] PRIMARY KEY CLUSTERED
(
[sigla] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[perfil_adocao]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[perfil_adocao](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [id_usuario] [int] NOT NULL,
    [especie_id] [int] NOT NULL,
    [porte_id] [int] NOT NULL,
    [idade_min] [int] NULL,
    [idade_max] [int] NULL,
    [temperamento_id] [int] NULL,
    [sexo_id] [int] NULL,
    [possui_crianca] [bit] NULL,
    [possui_pet] [bit] NULL,
    CONSTRAINT [pk_perfil_adocao] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[pet]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[pet](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [nome] [varchar](100) NOT NULL,
    [especie_id] [int] NOT NULL,
    [porte_id] [int] NOT NULL,
    [sexo_id] [int] NOT NULL,
    [raca] [varchar](60) NULL,
    [cor] [varchar](40) NULL,
    [idade] [int] NULL,
    CONSTRAINT [pk_pet] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[recuperacao_senha]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[recuperacao_senha](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [token] [varchar](255) NOT NULL,
    [usuario_id] [int] NOT NULL,
    [expiracao] [datetime2](7) NOT NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[sinalizacao]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[sinalizacao](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [id_anuncio] [int] NULL,
    [id_usuario] [int] NULL,
    CONSTRAINT [pk_sinalizacao] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Objeto:  Table [dbo].[usuario]    Data do Script: 04/05/2026 11:36:57 ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[usuario](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [nome] [varchar](100) NOT NULL,
    [contato_id] [int] NULL,
    [status_id] [int] NOT NULL,
    [senha_hash] [varchar](255) NOT NULL,
    [uf_usuario] [char](2) NOT NULL,
    [foto_url] [varchar](500) NULL,
    CONSTRAINT [pk_usuario] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
    SET IDENTITY_INSERT [dbo].[contato] ON

    INSERT [dbo].[contato] ([id], [nome], [cidade], [uf], [numero_celular], [email]) VALUES (3, N'Maria', N'São Carlos', N'SP', N'16999999999', N'maria3@email.com')
    INSERT [dbo].[contato] ([id], [nome], [cidade], [uf], [numero_celular], [email]) VALUES (4, N'Amanda', N'São Carlos', N'SP', N'16999999999', N'amanda4@email.com')
    INSERT [dbo].[contato] ([id], [nome], [cidade], [uf], [numero_celular], [email]) VALUES (5, N'Bruna', N'São Carlos', N'SP', N'16999999999', N'bruna5@email.com')
    INSERT [dbo].[contato] ([id], [nome], [cidade], [uf], [numero_celular], [email]) VALUES (6, N'Alice', N'São Carlos', N'SP', N'16999999999', N'alice6@email.com')
    INSERT [dbo].[contato] ([id], [nome], [cidade], [uf], [numero_celular], [email]) VALUES (7, N'Alice2', N'São Carlos', N'SP', N'16999999999', N'alice27@email.com')
    INSERT [dbo].[contato] ([id], [nome], [cidade], [uf], [numero_celular], [email]) VALUES (8, N'Alice', N'São Carlos', N'SP', N'16999999999', N'alice8@email.com')
    SET IDENTITY_INSERT [dbo].[contato] OFF
    GO
    SET IDENTITY_INSERT [dbo].[dominio_especie] ON

    INSERT [dbo].[dominio_especie] ([id], [descricao]) VALUES (2, N'cachorro')
    INSERT [dbo].[dominio_especie] ([id], [descricao]) VALUES (1, N'gato')
    SET IDENTITY_INSERT [dbo].[dominio_especie] OFF
    GO
    SET IDENTITY_INSERT [dbo].[dominio_porte] ON

    INSERT [dbo].[dominio_porte] ([id], [descricao]) VALUES (3, N'grande')
    INSERT [dbo].[dominio_porte] ([id], [descricao]) VALUES (2, N'medio')
    INSERT [dbo].[dominio_porte] ([id], [descricao]) VALUES (1, N'pequeno')
    SET IDENTITY_INSERT [dbo].[dominio_porte] OFF
    GO
    SET IDENTITY_INSERT [dbo].[dominio_sexo] ON

    INSERT [dbo].[dominio_sexo] ([id], [descricao]) VALUES (1, N'feminino')
    INSERT [dbo].[dominio_sexo] ([id], [descricao]) VALUES (2, N'masculino')
    INSERT [dbo].[dominio_sexo] ([id], [descricao]) VALUES (3, N'nao identificado')
    SET IDENTITY_INSERT [dbo].[dominio_sexo] OFF
    GO
    SET IDENTITY_INSERT [dbo].[dominio_situacao] ON

    INSERT [dbo].[dominio_situacao] ([id], [descricao]) VALUES (3, N'acolhido')
    INSERT [dbo].[dominio_situacao] ([id], [descricao]) VALUES (2, N'devolvido')
    INSERT [dbo].[dominio_situacao] ([id], [descricao]) VALUES (1, N'localizado')
    INSERT [dbo].[dominio_situacao] ([id], [descricao]) VALUES (4, N'visto')
    SET IDENTITY_INSERT [dbo].[dominio_situacao] OFF
    GO
    SET IDENTITY_INSERT [dbo].[dominio_status] ON

    INSERT [dbo].[dominio_status] ([id], [descricao]) VALUES (1, N'ativo')
    INSERT [dbo].[dominio_status] ([id], [descricao]) VALUES (2, N'inativo')
    INSERT [dbo].[dominio_status] ([id], [descricao]) VALUES (3, N'sinalizado')
    SET IDENTITY_INSERT [dbo].[dominio_status] OFF
    GO
    SET IDENTITY_INSERT [dbo].[dominio_temperamento] ON

    INSERT [dbo].[dominio_temperamento] ([id], [descricao]) VALUES (2, N'agitado')
    INSERT [dbo].[dominio_temperamento] ([id], [descricao]) VALUES (3, N'brincalhao')
    INSERT [dbo].[dominio_temperamento] ([id], [descricao]) VALUES (1, N'calmo')
    INSERT [dbo].[dominio_temperamento] ([id], [descricao]) VALUES (4, N'timido')
    SET IDENTITY_INSERT [dbo].[dominio_temperamento] OFF
    GO
    SET IDENTITY_INSERT [dbo].[dominio_tipo] ON

    INSERT [dbo].[dominio_tipo] ([id], [descricao]) VALUES (2, N'achado')
    INSERT [dbo].[dominio_tipo] ([id], [descricao]) VALUES (1, N'perdido')
    SET IDENTITY_INSERT [dbo].[dominio_tipo] OFF
    GO
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'AC', N'Acre')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'AL', N'Alagoas')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'AP', N'Amapa')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'AM', N'Amazonas')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'BA', N'Bahia')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'CE', N'Ceara')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'DF', N'Distrito Federal')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'ES', N'Espirito Santo')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'GO', N'Goias')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'MA', N'Maranhao')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'MT', N'Mato Grosso')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'MS', N'Mato Grosso do Sul')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'MG', N'Minas Gerais')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'PA', N'Para')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'PB', N'Paraiba')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'PR', N'Parana')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'PE', N'Pernambuco')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'PI', N'Piaui')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'RJ', N'Rio de Janeiro')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'RN', N'Rio Grande do Norte')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'RS', N'Rio Grande do Sul')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'RO', N'Rondonia')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'RR', N'Roraima')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'SC', N'Santa Catarina')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'SP', N'Sao Paulo')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'SE', N'Sergipe')
    INSERT [dbo].[dominio_uf] ([sigla], [descricao]) VALUES (N'TO', N'Tocantins')
    GO
    SET IDENTITY_INSERT [dbo].[usuario] ON

    INSERT [dbo].[usuario] ([id], [nome], [contato_id], [status_id], [senha_hash], [uf_usuario], [foto_url]) VALUES (7, N'Barbara', NULL, 1, N'$2a$10$galtTBqwfdNJGa1zALIVCenLN1M2Iz63gK7qI/On/h3bHnq29AG2e', N'SP', NULL)
    INSERT [dbo].[usuario] ([id], [nome], [contato_id], [status_id], [senha_hash], [uf_usuario], [foto_url]) VALUES (10, N'Maria', 3, 1, N'$2a$10$W.yogPIpZNP4tfz4leGXJO9x0s3q/EZjceUoHK.PwgjC2XOCitBSS', N'SP', NULL)
    INSERT [dbo].[usuario] ([id], [nome], [contato_id], [status_id], [senha_hash], [uf_usuario], [foto_url]) VALUES (11, N'Amanda', 4, 1, N'$2a$10$OjFID6ZLSfZ5pK9HXmilJuwpZ5Y/QVJkSUaRl4l296yDUnErhLXj2', N'SP', NULL)
    INSERT [dbo].[usuario] ([id], [nome], [contato_id], [status_id], [senha_hash], [uf_usuario], [foto_url]) VALUES (12, N'Bruna', 5, 1, N'$2a$10$KAY.C6ijHfSpHy5w0VgAE.WO3AfZKjZaM7nFwsNotfCxgNtoJKnJa', N'SP', NULL)
    INSERT [dbo].[usuario] ([id], [nome], [contato_id], [status_id], [senha_hash], [uf_usuario], [foto_url]) VALUES (13, N'Alice', 6, 1, N'$2a$10$0wHV1XwyO7wjgfvMbuyNi.LF8KhxPU3FzH3GloSCa2mddLVu0b75e', N'SP', NULL)
    INSERT [dbo].[usuario] ([id], [nome], [contato_id], [status_id], [senha_hash], [uf_usuario], [foto_url]) VALUES (14, N'Alice Final', 8, 1, N'$2a$10$QuXk/xeAptCE.x6cyc2RSu13kRF/QNNgdHDRHHe2yMvz2YmfOqucm', N'SP', N'/uploads/usuarios/alice.jpg')
    SET IDENTITY_INSERT [dbo].[usuario] OFF
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_contato_email]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[contato] ADD  CONSTRAINT [uq_contato_email] UNIQUE NONCLUSTERED
    (
    [email] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_dominio_especie_descricao]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[dominio_especie] ADD  CONSTRAINT [uq_dominio_especie_descricao] UNIQUE NONCLUSTERED
    (
    [descricao] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_dominio_porte_descricao]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[dominio_porte] ADD  CONSTRAINT [uq_dominio_porte_descricao] UNIQUE NONCLUSTERED
    (
    [descricao] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_dominio_sexo_descricao]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[dominio_sexo] ADD  CONSTRAINT [uq_dominio_sexo_descricao] UNIQUE NONCLUSTERED
    (
    [descricao] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_dominio_situacao_descricao]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[dominio_situacao] ADD  CONSTRAINT [uq_dominio_situacao_descricao] UNIQUE NONCLUSTERED
    (
    [descricao] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_dominio_status_descricao]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[dominio_status] ADD  CONSTRAINT [uq_dominio_status_descricao] UNIQUE NONCLUSTERED
    (
    [descricao] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_dominio_temperamento_descricao]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[dominio_temperamento] ADD  CONSTRAINT [uq_dominio_temperamento_descricao] UNIQUE NONCLUSTERED
    (
    [descricao] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_dominio_tipo_descricao]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[dominio_tipo] ADD  CONSTRAINT [uq_dominio_tipo_descricao] UNIQUE NONCLUSTERED
    (
    [descricao] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [uq_dominio_uf_descricao]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[dominio_uf] ADD  CONSTRAINT [uq_dominio_uf_descricao] UNIQUE NONCLUSTERED
    (
    [descricao] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
/****** Objeto:  Index [uq_perfil_adocao_usuario]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[perfil_adocao] ADD  CONSTRAINT [uq_perfil_adocao_usuario] UNIQUE NONCLUSTERED
    (
    [id_usuario] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
    SET ANSI_PADDING ON
    GO
/****** Objeto:  Index [UQ__recupera__CA90DA7A4B9C83BB]    Data do Script: 04/05/2026 11:36:57 ******/
ALTER TABLE [dbo].[recuperacao_senha] ADD UNIQUE NONCLUSTERED
    (
    [token] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    GO
ALTER TABLE [dbo].[administrador]  WITH CHECK ADD  CONSTRAINT [fk_administrador_usuario] FOREIGN KEY([usuario_id])
    REFERENCES [dbo].[usuario] ([id])
    GO
ALTER TABLE [dbo].[administrador] CHECK CONSTRAINT [fk_administrador_usuario]
    GO
ALTER TABLE [dbo].[anuncio]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_status] FOREIGN KEY([status_id])
    REFERENCES [dbo].[dominio_status] ([id])
    GO
ALTER TABLE [dbo].[anuncio] CHECK CONSTRAINT [fk_anuncio_status]
    GO
ALTER TABLE [dbo].[anuncio]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_usuario] FOREIGN KEY([id_usuario])
    REFERENCES [dbo].[usuario] ([id])
    GO
ALTER TABLE [dbo].[anuncio] CHECK CONSTRAINT [fk_anuncio_usuario]
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_achados_perdidos_anuncio] FOREIGN KEY([id])
    REFERENCES [dbo].[anuncio] ([id])
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos] CHECK CONSTRAINT [fk_anuncio_achados_perdidos_anuncio]
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_achados_perdidos_contato] FOREIGN KEY([contato_id])
    REFERENCES [dbo].[contato] ([id])
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos] CHECK CONSTRAINT [fk_anuncio_achados_perdidos_contato]
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_achados_perdidos_pet] FOREIGN KEY([pet_id])
    REFERENCES [dbo].[pet] ([id])
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos] CHECK CONSTRAINT [fk_anuncio_achados_perdidos_pet]
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_achados_perdidos_situacao] FOREIGN KEY([situacao_id])
    REFERENCES [dbo].[dominio_situacao] ([id])
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos] CHECK CONSTRAINT [fk_anuncio_achados_perdidos_situacao]
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_achados_perdidos_tipo] FOREIGN KEY([tipo_id])
    REFERENCES [dbo].[dominio_tipo] ([id])
    GO
ALTER TABLE [dbo].[anuncio_achados_perdidos] CHECK CONSTRAINT [fk_anuncio_achados_perdidos_tipo]
    GO
ALTER TABLE [dbo].[anuncio_adocao]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_adocao_anuncio] FOREIGN KEY([id])
    REFERENCES [dbo].[anuncio] ([id])
    GO
ALTER TABLE [dbo].[anuncio_adocao] CHECK CONSTRAINT [fk_anuncio_adocao_anuncio]
    GO
ALTER TABLE [dbo].[anuncio_adocao]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_adocao_contato] FOREIGN KEY([contato_id])
    REFERENCES [dbo].[contato] ([id])
    GO
ALTER TABLE [dbo].[anuncio_adocao] CHECK CONSTRAINT [fk_anuncio_adocao_contato]
    GO
ALTER TABLE [dbo].[anuncio_adocao]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_adocao_pet] FOREIGN KEY([pet_id])
    REFERENCES [dbo].[pet] ([id])
    GO
ALTER TABLE [dbo].[anuncio_adocao] CHECK CONSTRAINT [fk_anuncio_adocao_pet]
    GO
ALTER TABLE [dbo].[anuncio_adocao]  WITH CHECK ADD  CONSTRAINT [fk_anuncio_adocao_temperamento] FOREIGN KEY([temperamento_id])
    REFERENCES [dbo].[dominio_temperamento] ([id])
    GO
ALTER TABLE [dbo].[anuncio_adocao] CHECK CONSTRAINT [fk_anuncio_adocao_temperamento]
    GO
ALTER TABLE [dbo].[contato]  WITH CHECK ADD  CONSTRAINT [fk_contato_uf] FOREIGN KEY([uf])
    REFERENCES [dbo].[dominio_uf] ([sigla])
    GO
ALTER TABLE [dbo].[contato] CHECK CONSTRAINT [fk_contato_uf]
    GO
ALTER TABLE [dbo].[perfil_adocao]  WITH CHECK ADD  CONSTRAINT [fk_perfil_adocao_especie] FOREIGN KEY([especie_id])
    REFERENCES [dbo].[dominio_especie] ([id])
    GO
ALTER TABLE [dbo].[perfil_adocao] CHECK CONSTRAINT [fk_perfil_adocao_especie]
    GO
ALTER TABLE [dbo].[perfil_adocao]  WITH CHECK ADD  CONSTRAINT [fk_perfil_adocao_porte] FOREIGN KEY([porte_id])
    REFERENCES [dbo].[dominio_porte] ([id])
    GO
ALTER TABLE [dbo].[perfil_adocao] CHECK CONSTRAINT [fk_perfil_adocao_porte]
    GO
ALTER TABLE [dbo].[perfil_adocao]  WITH CHECK ADD  CONSTRAINT [fk_perfil_adocao_sexo] FOREIGN KEY([sexo_id])
    REFERENCES [dbo].[dominio_sexo] ([id])
    GO
ALTER TABLE [dbo].[perfil_adocao] CHECK CONSTRAINT [fk_perfil_adocao_sexo]
    GO
ALTER TABLE [dbo].[perfil_adocao]  WITH CHECK ADD  CONSTRAINT [fk_perfil_adocao_temperamento] FOREIGN KEY([temperamento_id])
    REFERENCES [dbo].[dominio_temperamento] ([id])
    GO
ALTER TABLE [dbo].[perfil_adocao] CHECK CONSTRAINT [fk_perfil_adocao_temperamento]
    GO
ALTER TABLE [dbo].[perfil_adocao]  WITH CHECK ADD  CONSTRAINT [fk_perfil_adocao_usuario] FOREIGN KEY([id_usuario])
    REFERENCES [dbo].[usuario] ([id])
    GO
ALTER TABLE [dbo].[perfil_adocao] CHECK CONSTRAINT [fk_perfil_adocao_usuario]
    GO
ALTER TABLE [dbo].[pet]  WITH CHECK ADD  CONSTRAINT [fk_pet_especie] FOREIGN KEY([especie_id])
    REFERENCES [dbo].[dominio_especie] ([id])
    GO
ALTER TABLE [dbo].[pet] CHECK CONSTRAINT [fk_pet_especie]
    GO
ALTER TABLE [dbo].[pet]  WITH CHECK ADD  CONSTRAINT [fk_pet_porte] FOREIGN KEY([porte_id])
    REFERENCES [dbo].[dominio_porte] ([id])
    GO
ALTER TABLE [dbo].[pet] CHECK CONSTRAINT [fk_pet_porte]
    GO
ALTER TABLE [dbo].[pet]  WITH CHECK ADD  CONSTRAINT [fk_pet_sexo] FOREIGN KEY([sexo_id])
    REFERENCES [dbo].[dominio_sexo] ([id])
    GO
ALTER TABLE [dbo].[pet] CHECK CONSTRAINT [fk_pet_sexo]
    GO
ALTER TABLE [dbo].[recuperacao_senha]  WITH CHECK ADD  CONSTRAINT [fk_recuperacao_usuario] FOREIGN KEY([usuario_id])
    REFERENCES [dbo].[usuario] ([id])
    GO
ALTER TABLE [dbo].[recuperacao_senha] CHECK CONSTRAINT [fk_recuperacao_usuario]
    GO
ALTER TABLE [dbo].[sinalizacao]  WITH CHECK ADD  CONSTRAINT [fk_sinalizacao_anuncio] FOREIGN KEY([id_anuncio])
    REFERENCES [dbo].[anuncio] ([id])
    GO
ALTER TABLE [dbo].[sinalizacao] CHECK CONSTRAINT [fk_sinalizacao_anuncio]
    GO
ALTER TABLE [dbo].[sinalizacao]  WITH CHECK ADD  CONSTRAINT [fk_sinalizacao_usuario] FOREIGN KEY([id_usuario])
    REFERENCES [dbo].[usuario] ([id])
    GO
ALTER TABLE [dbo].[sinalizacao] CHECK CONSTRAINT [fk_sinalizacao_usuario]
    GO
ALTER TABLE [dbo].[usuario]  WITH CHECK ADD  CONSTRAINT [fk_usuario_contato] FOREIGN KEY([contato_id])
    REFERENCES [dbo].[contato] ([id])
    GO
ALTER TABLE [dbo].[usuario] CHECK CONSTRAINT [fk_usuario_contato]
    GO
ALTER TABLE [dbo].[usuario]  WITH CHECK ADD  CONSTRAINT [fk_usuario_status] FOREIGN KEY([status_id])
    REFERENCES [dbo].[dominio_status] ([id])
    GO
ALTER TABLE [dbo].[usuario] CHECK CONSTRAINT [fk_usuario_status]
    GO
ALTER TABLE [dbo].[usuario]  WITH CHECK ADD  CONSTRAINT [fk_usuario_uf] FOREIGN KEY([uf_usuario])
    REFERENCES [dbo].[dominio_uf] ([sigla])
    GO
ALTER TABLE [dbo].[usuario] CHECK CONSTRAINT [fk_usuario_uf]
    GO
ALTER TABLE [dbo].[perfil_adocao]  WITH CHECK ADD  CONSTRAINT [ck_perfil_adocao_faixa] CHECK  (([idade_min] IS NULL OR [idade_max] IS NULL OR [idade_max]>=[idade_min]))
    GO
ALTER TABLE [dbo].[perfil_adocao] CHECK CONSTRAINT [ck_perfil_adocao_faixa]
    GO
ALTER TABLE [dbo].[perfil_adocao]  WITH CHECK ADD  CONSTRAINT [ck_perfil_adocao_idade_max] CHECK  (([idade_max] IS NULL OR [idade_max]>=(0)))
    GO
ALTER TABLE [dbo].[perfil_adocao] CHECK CONSTRAINT [ck_perfil_adocao_idade_max]
    GO
ALTER TABLE [dbo].[perfil_adocao]  WITH CHECK ADD  CONSTRAINT [ck_perfil_adocao_idade_min] CHECK  (([idade_min] IS NULL OR [idade_min]>=(0)))
    GO
ALTER TABLE [dbo].[perfil_adocao] CHECK CONSTRAINT [ck_perfil_adocao_idade_min]
    GO
ALTER TABLE [dbo].[pet]  WITH CHECK ADD  CONSTRAINT [ck_pet_idade] CHECK  (([idade] IS NULL OR [idade]>=(0)))
    GO
ALTER TABLE [dbo].[pet] CHECK CONSTRAINT [ck_pet_idade]
    GO
ALTER TABLE [dbo].[sinalizacao]  WITH CHECK ADD  CONSTRAINT [ck_sinalizacao_destino] CHECK  (([id_anuncio] IS NOT NULL OR [id_usuario] IS NOT NULL))
    GO
ALTER TABLE [dbo].[sinalizacao] CHECK CONSTRAINT [ck_sinalizacao_destino]
    GO
    USE [master]
    GO
ALTER DATABASE [respetcure] SET  READ_WRITE
GO
