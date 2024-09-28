package com.fullstack.inventory.service;

import com.fullstack.inventory.model.Product;
import com.fullstack.inventory.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

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
        when(productRepository.findAll()).thenReturn(Collections.singletonList(testProduct));
        List<Product> products = productService.getAllProducts();
        assertFalse(products.isEmpty());
        assertEquals(1, products.size());
        assertEquals(testProduct, products.get(0));
    }

    @Test
    void getProductById() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        Product product = productService.getProductById(1L);
        assertNotNull(product);
        assertEquals(testProduct, product);
    }

    @Test
    void createProduct() {
        when(productRepository.save(any(Product.class))).thenReturn(testProduct);
        Product createdProduct = productService.createProduct(testProduct);
        assertNotNull(createdProduct);
        assertEquals(testProduct, createdProduct);
    }

    @Test
    void updateProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        when(productRepository.save(any(Product.class))).thenReturn(testProduct);

        Product updatedProduct = new Product();
        updatedProduct.setName("Updated Product");
        updatedProduct.setDescription("Updated Description");
        updatedProduct.setPrice(new BigDecimal("20.00"));
        updatedProduct.setAvailableStock(200);

        Product result = productService.updateProduct(1L, updatedProduct);

        assertNotNull(result);
        assertEquals(updatedProduct.getName(), result.getName());
        assertEquals(updatedProduct.getDescription(), result.getDescription());
        assertEquals(updatedProduct.getPrice(), result.getPrice());
        assertEquals(updatedProduct.getAvailableStock(), result.getAvailableStock());
    }

    @Test
    void deleteProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        doNothing().when(productRepository).delete(testProduct);

        assertDoesNotThrow(() -> productService.deleteProduct(1L));
        verify(productRepository, times(1)).delete(testProduct);
    }
}