package com.corhuila.backend.controller;

import com.corhuila.backend.models.entity.Tarea;
import com.corhuila.backend.models.service.ITareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {

    @Autowired
    private ITareaService tareaService;

    @GetMapping
    public List<Tarea> getAll() {
        return tareaService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Tarea> getById(@PathVariable Long id) {
        return tareaService.findById(id);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Tarea> getByUsuario(@PathVariable Long idUsuario) {  // Cambiado a Long
        return tareaService.findByUsuario(idUsuario);
    }

    @GetMapping("/usuario/{idUsuario}/favoritas")
    public List<Tarea> getFavoritas(@PathVariable Long idUsuario) {  // Cambiado a Long
        return tareaService.findFavoritasByUsuario(idUsuario);
    }

    @GetMapping("/usuario/{idUsuario}/realizadas")
    public List<Tarea> getRealizadas(@PathVariable Long idUsuario) {  // Cambiado a Long
        return tareaService.findRealizadasByUsuario(idUsuario);
    }

    @PostMapping
    public Tarea create(@RequestBody Tarea tarea) {
        System.out.println("====== DATOS DE TAREA RECIBIDOS ======");
        System.out.println("Nombre: " + tarea.getNombre());
        System.out.println("Descripción: " + tarea.getDescripcion());
        System.out.println("Nota: " + tarea.getNota());

        // Verificar si el usuario viene en la petición
        if (tarea.getUsuario() != null) {
            System.out.println("Usuario ID: " + tarea.getUsuario().getId());
            System.out.println("Usuario Nombre: " + tarea.getUsuario().getNombreCompleto()); // Asegúrate de que tu entidad Usuario tenga getNombre()
        } else {
            System.out.println("⚠️ Usuario es NULL");
        }

        return tareaService.save(tarea);
    }
    @PutMapping("/{id}")
    public Tarea update(@PathVariable Long id, @RequestBody Tarea tarea) {
        Optional<Tarea> tareaExistente = tareaService.findById(id);
        if (tareaExistente.isPresent()) {
            tarea.setId(id);
            return tareaService.save(tarea);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tareaService.delete(id);
    }
}
