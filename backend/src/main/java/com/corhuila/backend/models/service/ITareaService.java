package com.corhuila.backend.models.service;

import com.corhuila.backend.models.entity.Tarea;

import java.util.List;
import java.util.Optional;

public interface ITareaService {
    List<Tarea> findAll();
    Optional<Tarea> findById(Long id);
    List<Tarea> findByUsuario(Long idUsuario); // Corregido: de String a Long
    List<Tarea> findFavoritasByUsuario(Long idUsuario); // Corregido
    List<Tarea> findRealizadasByUsuario(Long idUsuario); // Corregido
    Tarea save(Tarea tarea);
    void delete(Long id);
}
