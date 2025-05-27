package com.smartodo.backend.service;

import com.smartodo.backend.model.Student;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private final Map<String, String> validUsers = new HashMap<>();
    private final Map<String, Student> students = new HashMap<>();

    public UserService() {
        // Definimos usuarios con sus credenciales
        validUsers.put("amariaramirez@poligran.edu.co", "amariaramirez");
        validUsers.put("astcruz@poligran.edu.co", "astcruz");
        validUsers.put("aestupinansanchez@poligran.edu.co", "aestupinansanchez");
        validUsers.put("dsasierra@poligran.edu.co", "dsasierra");
        validUsers.put("epalomino@poligran.edu.co", "epalomino");
        validUsers.put("ealperez@poligran.edu.co", "ealperez");
        validUsers.put("glopezmoscoso@poligran.edu.co", "glopezmoscoso");
        validUsers.put("jepinilla@poligran.edu.co", "jepinilla");
        validUsers.put("jcarzambrano@poligran.edu.co", "jcarzambrano");
        validUsers.put("jalejcano@poligran.edu.co", "jalejcano");
        validUsers.put("jdiagudelo@poligran.edu.co", "jdiagudelo");
        validUsers.put("jesrosero@poligran.edu.co", "jesrosero");
        validUsers.put("jorosco@poligran.edu.co", "jorosco");
        validUsers.put("jsebastiamoreno@poligran.edu.co", "jsebastiamoreno");
        validUsers.put("jortegaa@poligran.edu.co", "jortegaa");
        validUsers.put("jandelahoz@poligran.edu.co", "jandelahoz");
        validUsers.put("lscadena@poligran.edu.co", "lscadena");
        validUsers.put("lsofihernandez@poligran.edu.co", "lsofihernandez");
        validUsers.put("malfonsecar@poligran.edu.co", "malfonsecar");
        validUsers.put("malejparra@poligran.edu.co", "malejparra");
        validUsers.put("mtibabisco@poligran.edu.co", "mtibabisco");
        validUsers.put("nsrincon@poligran.edu.co", "nsrincon");
        validUsers.put("nalejo@poligran.edu.co", "nalejo");
        validUsers.put("nsanabriau@poligran.edu.co", "nsanabriau");
        validUsers.put("savilac@poligran.edu.co", "savilac");
        validUsers.put("ssalamanca@poligran.edu.co", "ssalamanca");
        validUsers.put("szaratev@poligran.edu.co", "szaratev");
        validUsers.put("sspena@poligran.edu.co", "sspena");
        validUsers.put("jpenata@poligran.edu.co", "jpenata");
        validUsers.put("tsoto@poligran.edu.co", "tsoto");
        validUsers.put("yvazquez@poligran.edu.co", "yvazquez");






    
        students.put("amariaramirez@poligran.edu.co", new Student("amariaramirez@poligran.edu.co", "Ana Ramirez", "Bog Ingeniería de Sistemas", "AR"));
        students.put("astcruz@poligran.edu.co", new Student("astcruz@poligran.edu.co", "Andy Cruz", "Bog Ingeniería de Sistemas", "AC"));
        students.put("aestupinansanchez@poligran.edu.co", new Student("aestupinansanchez@poligran.edu.co", "Angela Estupiñan", "Bog Ingeniería de Sistemas", "AE"));
        students.put("dsasierra@poligran.edu.co", new Student("dsasierra@poligran.edu.co", "David Sierra", "Bog Ingeniería de Sistemas", "DS"));
        students.put("epalomino@poligran.edu.co", new Student("epalomino@poligran.edu.co", "Eddy Palomino", "Bog Desarrollo de Software", "EP"));
        students.put("ealperez@poligran.edu.co", new Student("ealperez@poligran.edu.co", "Esteban Perez", "Bog Ingeniería de Sistemas", "EP"));
        students.put("glopezmoscoso@poligran.edu.co", new Student("glopezmoscoso@poligran.edu.co", "Gisseth Lopez", "Bog Desarrollo de Software", "GL"));
        students.put("jepinilla@poligran.edu.co", new Student("jepinilla@poligran.edu.co", "Janah Pinilla 🌹", "Bog Ingeniería de Sistemas", "JP"));
        students.put("jcarzambrano@poligran.edu.co", new Student("jcarzambrano@poligran.edu.co", "Jean Zambrano", "Bog Ingeniería de Sistemas", "JZ"));
        students.put("jalejcano@poligran.edu.co", new Student("jalejcano@poligran.edu.co", "Aleja Cano🌹", "Bog Ingeniería de Sistemas", "AC"));
        students.put("jdiagudelo@poligran.edu.co", new Student("jdiagudelo@poligran.edu.co", "Jojo ⚽", "Bog Ingeniería de Sistemas", "JA"));
        students.put("jesrosero@poligran.edu.co", new Student("jesrosero@poligran.edu.co", "Juan Esteban Rosero 😎", "Bog Ingeniería de Sistemas", "JR"));
        students.put("jorosco@poligran.edu.co", new Student("jorosco@poligran.edu.co", "Juan Gabriel Orosco", "Bog Ingeniería de Sistemas", "JO"));
        students.put("jsebastiamoreno@poligran.edu.co", new Student("jsebastiamoreno@poligran.edu.co", "Juan Sebastian Moreno", "Bog Ingeniería de Sistemas", "JM"));
        students.put("jortegaa@poligran.edu.co", new Student("jortegaa@poligran.edu.co", "Juanita Ortega", "Bog Diseño Interactivo", "JO"));
        students.put("jandelahoz@poligran.edu.co", new Student("jandelahoz@poligran.edu.co", "Julian De La Hoz ⚽", "Bog Ingeniería en Ciencia de Datos", "JDLH"));
        students.put("lscadena@poligran.edu.co", new Student("lscadena@poligran.edu.co", "Laura Cadena 💅", "Bog Ingeniería en Ciencia de Datos", "LC"));
        students.put("lsofihernandez@poligran.edu.co", new Student("lsofihernandez@poligran.edu.co", "Laura Hernandez", "Bog Ingeniería de Sistemas", "LH"));
        students.put("malfonsecar@poligran.edu.co", new Student("malfonsecar@poligran.edu.co", "El Manu 🥵", "Bog Ingeniería de Sistemas", "MF"));
        students.put("malejparra@poligran.edu.co", new Student("malejparra@poligran.edu.co", "Aleja Parra 🌹", "Bog Ingeniería de Sistemas", "AP"));
        students.put("mtibabisco@poligran.edu.co", new Student("mtibabisco@poligran.edu.co", "Mateo Tibabisco", "Bog Ingeniería de Sistemas", "MT"));
        students.put("nsrincon@poligran.edu.co", new Student("nsrincon@poligran.edu.co", "Nicol Sofia Rincón", "Bog Ingeniería de Sistemas", "NR"));
        students.put("nalejo@poligran.edu.co", new Student("nalejo@poligran.edu.co", "Nicolas Alejo", "Bog Ingeniería de Sistemas", "NA"));
        students.put("nsanabriau@poligran.edu.co", new Student("nsanabriau@poligran.edu.co", "Nicolas Urrea", "Bog Diseño Interactivo", "NU"));
        students.put("savilac@poligran.edu.co", new Student("savilac@poligran.edu.co", "Santiago Avila", "Bog Ingeniería en Cienca de Datos", "SA"));
        students.put("ssalamanca@poligran.edu.co", new Student("ssalamanca@poligran.edu.co", "Santiago Salamanca", "Bog Ingeniería de Sistemas", "SS"));
        students.put("szaratev@poligran.edu.co", new Student("szaratev@poligran.edu.co", "Santiago Zarate", "Bog Ingeniería de Sistemas", "SZ"));
        students.put("sspena@poligran.edu.co", new Student("sspena@poligran.edu.co", "Sara Sofia Peña", "Bog Ingeniería en Ciencia de Datos", "SP"));
        students.put("jpenata@poligran.edu.co", new Student("jpenata@poligran.edu.co", "Tom 💦", "Bog Ingeniería de Sistemas", "Tom"));
        students.put("tsoto@poligran.edu.co", new Student("tsoto@poligran.edu.co", "Toto 💪", "Bog Ingeniería de Sistemas", "TS"));
        students.put("yvazquez@poligran.edu.co", new Student("yvazquez@poligran.edu.co", "Yerik Vazquez", "Bog Ingeniería de Sistemas", "YV"));

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }   

    // Método para validar usuario
    public boolean validateUser(String email, String password) {
        return validUsers.containsKey(email) && validUsers.get(email).equals(password);
    }

    // Método para obtener información del estudiante
    public Student getStudentInfo(String email) {
        return students.get(email);
    }
}
