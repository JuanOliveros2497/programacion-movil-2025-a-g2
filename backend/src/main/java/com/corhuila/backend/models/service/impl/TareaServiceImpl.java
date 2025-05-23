package com.corhuila.backend.models.service.impl;

import com.corhuila.backend.models.entity.Tarea;
import com.corhuila.backend.models.dao.ITareaRepository;
import com.corhuila.backend.models.service.ITareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaServiceImpl implements ITareaService {

    @Autowired
    private ITareaRepository tareaRepository;

    @Override
    public List<Tarea> findAll() {
        return tareaRepository.findAll();
    }

    @Override
    public Optional<Tarea> findById(Long id) {
        return tareaRepository.findById(id);
    }

    @Override
    public List<Tarea> findByUsuario(Long idUsuario) {
        return tareaRepository.findByUsuario_Id(idUsuario); // Cambiado a Long
    }

    @Override
    public List<Tarea> findFavoritasByUsuario(Long idUsuario) {
        return tareaRepository.findByUsuario_IdAndFavoritaTrue(idUsuario); // Cambiado a Long
    }

    @Override
    public List<Tarea> findRealizadasByUsuario(Long idUsuario) {
        return tareaRepository.findByUsuario_IdAndRealizadaTrue(idUsuario); // Cambiado a Long
    }

    @Override
    public Tarea save(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    @Override
    public void delete(Long id) {
        tareaRepository.deleteById(id);
    }
}
