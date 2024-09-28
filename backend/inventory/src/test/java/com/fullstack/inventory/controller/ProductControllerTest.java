package com.fullstack.inventory.controller;

import com.fullstack.inventory.model.Product;
import com.fullstack.inventory.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private Product testProduct;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        testProduct = new Product();
        testProduct.setId(1L);
        testProduct.setName("Test Product");
        testProduct.setDescription("Test Description");
        testProduct.setPrice(new BigDecimal("10.00"));
        testProduct.setAvailableStock(100);
    }

    @Test
    void getAllProducts() {
        when(productService.getAllProducts()).thenReturn(Arrays.asList(testProduct));
        List<Product> products = productController.getAllProducts();
        assertFalse(products.isEmpty());
        assertEquals(1, products.size());
        assertEquals(testProduct, products.get(0));
    }

    @Test
    void getProductById() {
        when(productService.getProductById(1L)).thenReturn(testProduct);
        ResponseEntity<Product> response = productController.getProductById(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testProduct, response.getBody());
    }

    @Test
    void createProduct() {
        when(productService.createProduct(any(Product.class))).thenReturn(testProduct);
        ResponseEntity<Product> response = productController.createProduct(testProduct);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testProduct, response.getBody());
    }

    @Test
    void updateProduct() {
        when(productService.updateProduct(eq(1L), any(Product.class))).thenReturn(testProduct);
        ResponseEntity<Product> response = productController.updateProduct(1L, testProduct);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testProduct, response.getBody());
    }

    @Test
    void deleteProduct() {
        doNothing().when(productService).deleteProduct(1L);
        ResponseEntity<?> response = productController.deleteProduct(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}