package com.inal.wo.exceptions;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * error message class.
 */
@Setter
@Getter
@Builder
@AllArgsConstructor
public class ErrorMessage {
    private Date timestamp;
    private int status;
    private String error;
    private Object message;
    private String path;
}
