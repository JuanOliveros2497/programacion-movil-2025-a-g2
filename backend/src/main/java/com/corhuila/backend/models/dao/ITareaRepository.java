package com.corhuila.backend.models.dao;

import com.corhuila.backend.models.entity.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByUsuario_Id(Long id); // ✔ ID correcto
    List<Tarea> findByUsuario_IdAndFavoritaTrue(Long id); // ✔ corregido
    List<Tarea> findByUsuario_IdAndRealizadaTrue(Long id); // ✔ corregido
}
