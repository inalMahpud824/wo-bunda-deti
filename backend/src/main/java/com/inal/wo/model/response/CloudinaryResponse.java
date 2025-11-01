package com.inal.wo.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CloudinaryResponse {
    private String assetId;
    private String publicId;
    private Number version;
    private String format;
    private String secureUrl;
    private String url;
}
