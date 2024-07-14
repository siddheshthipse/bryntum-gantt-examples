/**
 * MS Project import example.
 * Copyright Bryntum, 2021
 */
package bryntum.gantt.projectreader;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Properties;

import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.reader.UniversalProjectReader;

public class Main {
    private static String errorMessage = "There was an exception raised during the operation. Exception message: ";
    private static String wrongUsageMessage = "Usage: java -jar bryntum-project-reader.jar mpp-file output-file \nNote: provide \"1\" instead of output-file path to return JSON into stdout.";

    static Properties defaultProperties = new Properties();
    static Properties properties = new Properties(defaultProperties);

    static {
        try {
            defaultProperties.load(Main.class.getResourceAsStream("/META-INF/projectreader.default.properties"));

            // if properties file overriding defaults exists - load it
            if (Main.class.getResource("/META-INF/projectreader.properties") != null) {
                properties.load(Main.class.getResourceAsStream("/META-INF/projectreader.properties"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    static SimpleDateFormat dateFormat = new SimpleDateFormat(properties.getProperty("date.format", "yyyy-MM-dd'T'HH:mm:ss"));
    static SimpleDateFormat timeFormat = new SimpleDateFormat(properties.getProperty("time.format", "HH:mm"));

    static int indentFactor = Integer.parseInt(properties.getProperty("indent.size", "4"));

    public static void main(String[] args) {
        String sourceFile, targetFile;
        Boolean printResult;

        try {
            if (args.length < 2) {
                System.out.println(wrongUsageMessage);
                System.exit(0);
            }

            sourceFile = args[0];
            targetFile = args[1];
            printResult = targetFile.equals("1");

            // optional indent size for resulting JSON string
            if (args.length > 2 && args[2] != null) {
                indentFactor = Integer.parseInt(args[2]);
            }

            if (args.length > 3 && args[3] != null) {
                dateFormat = new SimpleDateFormat(args[3]);
            }

            String extension = "";

            // get file extension
            int i = sourceFile.lastIndexOf('.');
            if (i > 0) {
                extension = sourceFile.substring(i + 1);
            }

            String fileToRead = sourceFile;

            boolean isMpx = extension.equalsIgnoreCase("mpx");

            // if that's an MPX-file -> patch it
            if (isMpx) {
            	fileToRead = MpxFileUnitPatch.apply(sourceFile);
            }

            ProjectFile projectFile = new UniversalProjectReader().read(fileToRead);
            String result = new MainJSONBuilder(properties, dateFormat, timeFormat, isMpx).buildJSON(projectFile).toString(indentFactor);

            if (printResult) {
                System.out.println(result);
            } else {
                BufferedWriter out = new BufferedWriter(new FileWriter(targetFile));
                out.write(result);
                out.close();
            }

        } catch (Exception e) {
            System.out.println(errorMessage);
            e.printStackTrace();
            System.exit(0);
        }
    }
}
