package com.example.exam.controller;

import com.example.exam.model.student;
import com.example.exam.model.supervisor;
import com.example.exam.repository.studentRepository;
import com.example.exam.repository.supervisorRepository;
import com.sun.net.httpserver.Authenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
public class keaController {

    supervisorRepository supervisorRepository;
    studentRepository studentRepository;

    public keaController(studentRepository studentRepository, supervisorRepository supervisorRepository){this.studentRepository = studentRepository;
    this.supervisorRepository = supervisorRepository;}

    @GetMapping("/index.html")
    public String index(){return "index";};

    @GetMapping("/student")
    public Iterable<student> student(){return studentRepository.findAll();
    }

    @GetMapping("/supervisor")
    public Iterable<supervisor> supervisor(){return supervisorRepository.findAll();
    }

    @PostMapping("/student")
    public ResponseEntity<String> create(@ModelAttribute student s){
        student createStudent;
        createStudent = studentRepository.save(s);
        System.out.println("SUCCESS");
        return ResponseEntity.status(201).header("Location", "/student/" + createStudent.getId()).body("{'Besked': 'student oprettet'}");
    }

    @PutMapping("/update")
    public student update1(@ModelAttribute student s){
        student readStudent = studentRepository.findById(s.getId()).get();
        if(s.getId() != readStudent.getId() || !s.getName().equals(readStudent.getName()) || !s.getEmail().equals(readStudent.getEmail()) || s.getSupervisors() != readStudent.getSupervisors()){
            System.out.println("SUCCESS");
            readStudent.setId(s.getId());
            readStudent.setName(s.getName());
            readStudent.setEmail(s.getEmail());
            readStudent.setSupervisors(s.getSupervisors());
            return studentRepository.save(readStudent);

        }
        else {
            System.out.println("FAILURE");
            return s;
        }
    }
  /*
    @PostMapping("/update{id}")
    public student update(@RequestParam("id") int id, @RequestParam("name") String name, @RequestParam("email") String email, @RequestParam("superID") int superId){
        System.out.println("Update hit");
        student readStudent = studentRepository.findById(id).get();
        if(!name.equals("")) {
            readStudent.setName(name);//add checks for null values so you don't need to re-enter
        }
        if(!email.equals("")){readStudent.setEmail(email);}
        if(superId>0){
            readStudent.setSupervisors(supervisorRepository1.findById(superId).get());}
        return studentRepository.save(readStudent);
    }
*/
    @DeleteMapping("/student/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        studentRepository.deleteById(id);
        return ResponseEntity.status(200).body("{'Besked':'Slettet!'}");
    }

}
