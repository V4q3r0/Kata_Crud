package co.com.sofka.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    //Se crea un objeto de repository
    @Autowired
    private TodoRepository repository;

    //Función para mostrar todos los datos
    public Iterable<Todo> list(){
        return repository.findAll();
    }

    //Función para guardar los datos
    public Todo save(Todo todo){
        return repository.save(todo);
    }

    //Función para obtener un dato por ID
    public Todo get(Long id) throws Exception {
        return repository.findById(id).orElseThrow(() -> new Exception("No se encontro con la id - " + id));
    }

    //Función para eliminar un dato por ID
    public void delete(Long id) throws Exception {
        repository.delete(get(id));
    }
}
