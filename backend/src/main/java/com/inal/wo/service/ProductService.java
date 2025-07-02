package com.inal.wo.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import com.inal.wo.entity.Product;
import com.inal.wo.model.request.ProductRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.model.response.ProductResponse;
import com.inal.wo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private static final String UPLOAD_DIR = "uploads";
    private static final String PRODUCT_NOT_FOUND_MESSAGE = "Product tidak ditemukan";
    private final ProductRepository productRepository;
    

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
      // Buat folder jika belum ada
        File dir = new File(UPLOAD_DIR);
        if(!dir.exists()) dir.mkdirs();

        Product data = new Product();
        saveFile(request, data);

        data.setActiveStatus(true);
        data.setName(request.getName());
        data.setPrice(request.getPrice());
        data.setDescriptionDetail(request.getDetailDescription());
        data.setDescriptionShort(request.getShortDescription());
        data.setCreatedAt(LocalDateTime.now());
        data.setUpdateAt(LocalDateTime.now());

        productRepository.save(data);
        return buildProductRes(data);
    }

    public ProductResponse getProductById(Long idProduct) {
        log.info("request get product by id {}", idProduct);
        Product product = productRepository.findById(idProduct).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, PRODUCT_NOT_FOUND_MESSAGE));

        return buildProductRes(product);
    }

    public List<ProductResponse> getAllProduct() {
        log.info("request get all product");

        List<Product> products = productRepository.findAll();
        List<ProductResponse> response = new ArrayList<>();
        for(Product prod : products) {
            ProductResponse data = buildProductRes(prod);
            response.add(data);
        }
        return response;
    }

    @Transactional
    public GeneralResponse<Void> deleteProduct(Long idProduct) {
        log.info("request api delete product with id {}", idProduct);
        Product product = productRepository.findById(idProduct).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, PRODUCT_NOT_FOUND_MESSAGE));
        

        // Hapus file gambar
        deleteFile(product);

        productRepository.delete(product);

        GeneralResponse<Void> response = new GeneralResponse<>();
        response.setMessage("Success delete product");
        response.setStatus(200);
        return response;
    }

    @Transactional
    public ProductResponse updateProduct(Long idProduct, ProductRequest request) {
        log.info("Request update product with id {} and request {}", idProduct, request);

        Product product = productRepository.findById(idProduct).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, PRODUCT_NOT_FOUND_MESSAGE));
        
        product.setUpdateAt(LocalDateTime.now());
        product.setName(request.getName());
        product.setDescriptionDetail(request.getDetailDescription());
        product.setDescriptionShort(request.getShortDescription());
        product.setPrice(request.getPrice());

        MultipartFile fileNew = request.getPhoto();
        if(fileNew != null && !fileNew.isEmpty()) {
            // hapus file lama
            deleteFile(product);

            // simpan file baru
            saveFile(request, product);
        }

        productRepository.save(product);


        return buildProductRes(product);
    }

    @Transactional
    public ProductResponse updateStatusProduct(Long idProduct, Boolean status) {
        log.info("Request update status product with id {}", idProduct);
        Product product = productRepository.findById(idProduct).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, PRODUCT_NOT_FOUND_MESSAGE));
        product.setActiveStatus(status);
        productRepository.save(product);
        return buildProductRes(product);

    }
    
    public List<ProductResponse> getAllProductActive() {
        log.info("request get all product active");

        List<Product> products = productRepository.findAllByActiveStatus(true);
        List<ProductResponse> response = new ArrayList<>();
        for (Product prod : products) {
            ProductResponse data = buildProductRes(prod);
            response.add(data);
        }
        return response;
    }

    public ProductResponse getProductActiveById(Long idProduct) {
        log.info("request get product Active by id {}", idProduct);
        Product product = productRepository
            .findByIdAndActiveStatus(idProduct, true).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, PRODUCT_NOT_FOUND_MESSAGE));

        return buildProductRes(product);
    }

    private void deleteFile(Product product) {
        // Hapus file gambar
        if (product.getPhoto() != null) {
            Path imagePath = Paths.get(UPLOAD_DIR, product.getPhoto());
            try {
                Files.deleteIfExists(imagePath);
                log.info("Gambar {} berhasil dihapus", imagePath);
            } catch (IOException e) {
                log.error("Gagal menghapus gambar: {}", imagePath, e);
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Gagal menghapus gambar produk");
            }
        }
    }

    private void saveFile(ProductRequest request, Product product) {
        if(request.getPhoto() == null || request.getPhoto().isEmpty()) {
            return;
        }
        try {
            String fileName = UUID.randomUUID() + "_" + request.getPhoto().getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.copy(request.getPhoto().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            product.setPhoto(fileName);
        } catch (IOException e) {
            log.error("Gagal menyimpan gambar baru", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Gagal menyimpan gambar baru");
        }
    }

    private ProductResponse buildProductRes(Product product) {
        ProductResponse res = new ProductResponse();
        res.setActiveStatus(product.getActiveStatus());
        res.setId(product.getId());
        res.setPhoto(product.getPhoto());
        res.setPrice(product.getPrice());
        res.setProductName(product.getName());
        res.setShortDescription(product.getDescriptionShort());
        res.setDetailDescription(product.getDescriptionDetail());
        return res;
    }
}
