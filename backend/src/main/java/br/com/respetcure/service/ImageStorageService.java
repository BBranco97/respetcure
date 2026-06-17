package br.com.respetcure.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@Service
public class ImageStorageService {

    private static final Set<String> ALLOWED_EXTENSIONS =
            Set.of("jpg", "jpeg", "png", "webp", "gif");

    private final Path uploadRoot =
            Paths.get("uploads")
                    .toAbsolutePath()
                    .normalize();

    public String saveUserImage(
            MultipartFile file
    ) {
        return saveImage(
                file,
                "usuarios"
        );
    }

    public String savePetImage(
            MultipartFile file
    ) {
        return saveImage(
                file,
                "pets"
        );
    }

    private String saveImage(
            MultipartFile file,
            String folder
    ) {

        validateFile(file);

        String originalName =
                file.getOriginalFilename() == null
                        ? ""
                        : file.getOriginalFilename();

        String extension =
                getExtension(originalName);

        String fileName =
                UUID.randomUUID() + "." + extension;

        Path uploadDir =
                uploadRoot
                        .resolve(folder)
                        .normalize();

        Path destination =
                uploadDir
                        .resolve(fileName)
                        .normalize();

        if (!destination.startsWith(uploadDir)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Nome de arquivo invalido."
            );
        }

        try {
            Files.createDirectories(uploadDir);
            Files.copy(
                    file.getInputStream(),
                    destination,
                    StandardCopyOption.REPLACE_EXISTING
            );
        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Nao foi possivel salvar a imagem."
            );
        }

        return "/uploads/" + folder + "/" + fileName;
    }

    private void validateFile(
            MultipartFile file
    ) {

        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Imagem nao informada."
            );
        }

        String contentType =
                file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Arquivo deve ser uma imagem."
            );
        }

        String extension =
                getExtension(file.getOriginalFilename());

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Formato de imagem nao suportado."
            );
        }
    }

    private String getExtension(
            String fileName
    ) {

        if (fileName == null) {
            return "";
        }

        int lastDot =
                fileName.lastIndexOf(".");

        if (lastDot < 0 || lastDot == fileName.length() - 1) {
            return "";
        }

        return fileName
                .substring(lastDot + 1)
                .toLowerCase(Locale.ROOT);
    }
}
