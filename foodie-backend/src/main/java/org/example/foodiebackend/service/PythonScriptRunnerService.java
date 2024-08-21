package org.example.foodiebackend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class PythonScriptRunnerService {

    Logger logger = LoggerFactory.getLogger(PythonScriptRunnerService.class);

    public String runPythonScript(String directory, String scriptName, String[] args) {
        try {
            List<String> argsList = new ArrayList<>(List.of("cmd.exe", "/C", "python", scriptName));
            argsList.addAll(List.of(args));
            ProcessBuilder processBuilder = new ProcessBuilder(argsList);
            processBuilder.directory(new File(directory));
            Process process = processBuilder.start();
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line = "";
            while ((line = errorReader.readLine()) != null) {
                logger.debug(line);
            }
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            return reader.readLine();
        } catch (IOException e) {
        }
        return null;
    }
}
