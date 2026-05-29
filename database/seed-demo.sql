USE [respetcure]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
SET ANSI_WARNINGS ON
GO
SET ARITHABORT ON
GO
SET CONCAT_NULL_YIELDS_NULL ON
GO
SET NUMERIC_ROUNDABORT OFF
GO

SET XACT_ABORT ON
GO

BEGIN TRANSACTION
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[contato] WHERE [id] = 20)
BEGIN
    SET IDENTITY_INSERT [dbo].[contato] ON

    INSERT [dbo].[contato] ([id], [nome], [cidade], [uf], [numero_celular], [email]) VALUES
        (20, N'RespetCure Demo', N'Sao Paulo', N'SP', N'11988880001', N'demo@respetcure.com'),
        (21, N'Lar Temporario Sol', N'Sao Paulo', N'SP', N'11988880002', N'sol@respetcure.com'),
        (22, N'Feira de Adocao Central', N'Sao Carlos', N'SP', N'16988880003', N'feira@respetcure.com'),
        (23, N'Casa da Ana', N'Campinas', N'SP', N'19988880004', N'ana@respetcure.com'),
        (24, N'Pedro Almeida', N'Sao Paulo', N'SP', N'11977770001', N'pedro@respetcure.com'),
        (25, N'Juliana Costa', N'Sao Carlos', N'SP', N'16977770002', N'juliana@respetcure.com'),
        (26, N'Marina Lopes', N'Campinas', N'SP', N'19977770003', N'marina@respetcure.com'),
        (27, N'Rafael Santos', N'Ribeirao Preto', N'SP', N'16977770004', N'rafael@respetcure.com')

    SET IDENTITY_INSERT [dbo].[contato] OFF
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[usuario] WHERE [id] = 20)
BEGIN
    SET IDENTITY_INSERT [dbo].[usuario] ON

    INSERT [dbo].[usuario] ([id], [nome], [contato_id], [status_id], [senha_hash], [uf_usuario], [foto_url]) VALUES
        (20, N'Demo RespetCure', 20, 1, N'$2a$10$galtTBqwfdNJGa1zALIVCenLN1M2Iz63gK7qI/On/h3bHnq29AG2e', N'SP', N'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo'),
        (21, N'Lar Temporario Sol', 21, 1, N'$2a$10$galtTBqwfdNJGa1zALIVCenLN1M2Iz63gK7qI/On/h3bHnq29AG2e', N'SP', N'https://api.dicebear.com/7.x/avataaars/svg?seed=Sol'),
        (22, N'Feira Central', 22, 1, N'$2a$10$galtTBqwfdNJGa1zALIVCenLN1M2Iz63gK7qI/On/h3bHnq29AG2e', N'SP', N'https://api.dicebear.com/7.x/avataaars/svg?seed=Feira'),
        (23, N'Ana Voluntaria', 23, 1, N'$2a$10$galtTBqwfdNJGa1zALIVCenLN1M2Iz63gK7qI/On/h3bHnq29AG2e', N'SP', N'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana')

    SET IDENTITY_INSERT [dbo].[usuario] OFF
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[pet] WHERE [id] = 20)
BEGIN
    SET IDENTITY_INSERT [dbo].[pet] ON

    INSERT [dbo].[pet] ([id], [nome], [especie_id], [porte_id], [sexo_id], [raca], [cor], [idade]) VALUES
        (20, N'Bolinha', 2, 2, 2, N'SRD', N'Caramelo', 2),
        (21, N'Luna', 1, 1, 1, N'Siamese', N'Cinza e creme', 1),
        (22, N'Max', 2, 3, 2, N'Labrador', N'Dourado', 4),
        (23, N'Mel', 2, 1, 1, N'Poodle', N'Branca', 3),
        (24, N'Toby', 2, 2, 2, N'Beagle', N'Tricolor', 5),
        (25, N'Lola', 2, 1, 1, N'Shih Tzu', N'Branca e marrom', 3),
        (26, N'Nina', 1, 1, 1, N'SRD', N'Preta', 2),
        (27, N'Bento', 2, 1, 2, N'Pug', N'Bege', 1),
        (28, N'Frida', 1, 1, 1, N'Persa', N'Branca', 4),
        (29, N'Thor', 2, 3, 2, N'Pastor Alemao', N'Preto e marrom', 6)

    SET IDENTITY_INSERT [dbo].[pet] OFF
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[anuncio] WHERE [id] = 20)
BEGIN
    SET IDENTITY_INSERT [dbo].[anuncio] ON

    INSERT [dbo].[anuncio] ([id], [id_usuario], [status_id]) VALUES
        (20, 20, 1),
        (21, 21, 1),
        (22, 22, 1),
        (23, 23, 1),
        (24, 20, 1),
        (25, 21, 1),
        (26, 22, 1),
        (27, 23, 1),
        (28, 20, 1),
        (29, 21, 1)

    SET IDENTITY_INSERT [dbo].[anuncio] OFF
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[anuncio_adocao] WHERE [id] = 20)
BEGIN
    INSERT [dbo].[anuncio_adocao] (
        [id], [pet_id], [contato_id], [temperamento_id], [convive_criancas],
        [convive_pets], [desmamado], [vacinado], [vermifugado], [castrado],
        [vacinas], [data_vacina], [descricao]
    ) VALUES
        (20, 20, 20, 3, 1, 1, 1, 1, 1, 1, N'V10 e antirrabica', '2026-03-12', N'Bolinha e docil, brincalhao e procura uma familia com quintal ou rotina de passeios.'),
        (21, 21, 21, 1, 1, 1, 1, 1, 1, 0, N'Antirrabica', '2026-02-04', N'Luna e tranquila, usa caixa de areia e convive bem com outros gatos.'),
        (22, 22, 22, 1, 1, 1, 1, 1, 1, 1, N'V10, gripe e antirrabica', '2026-01-28', N'Max e companheiro e obediente, ideal para uma familia que goste de caminhadas.'),
        (23, 23, 23, 4, 1, 0, 1, 1, 1, 1, N'V8 e antirrabica', '2026-04-03', N'Mel e pequena, carinhosa e se adapta bem a apartamento.')
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[anuncio_achados_perdidos] WHERE [id] = 24)
BEGIN
    INSERT [dbo].[anuncio_achados_perdidos] (
        [id], [situacao_id], [tipo_id], [pet_id], [contato_id], [localizacao]
    ) VALUES
        (24, 4, 1, 24, 24, geography::Point(-23.5874, -46.6576, 4326)),
        (25, 3, 2, 25, 25, geography::Point(-22.0175, -47.8909, 4326)),
        (26, 4, 1, 26, 26, geography::Point(-22.9056, -47.0608, 4326)),
        (27, 3, 2, 27, 27, geography::Point(-21.1775, -47.8103, 4326)),
        (28, 4, 1, 28, 20, geography::Point(-23.5614, -46.6559, 4326)),
        (29, 3, 2, 29, 21, geography::Point(-23.5505, -46.6333, 4326))
END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[perfil_adocao] WHERE [id_usuario] = 20)
BEGIN
    INSERT [dbo].[perfil_adocao] (
        [id_usuario], [especie_id], [porte_id], [idade_min], [idade_max],
        [temperamento_id], [sexo_id], [possui_crianca], [possui_pet]
    ) VALUES
        (20, 2, 2, 1, 5, 3, 2, 1, 1),
        (21, 1, 1, 0, 4, 1, 1, 0, 1),
        (22, 2, 3, 2, 8, 1, 2, 1, 0)
END
GO

COMMIT TRANSACTION
GO
