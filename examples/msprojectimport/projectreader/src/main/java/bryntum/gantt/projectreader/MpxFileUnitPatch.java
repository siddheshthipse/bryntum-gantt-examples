package bryntum.gantt.projectreader;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

// This class replaces "wk" units with "w" in the provided MPX-files.
// needed until https://github.com/joniles/mpxj/issues/250 is done
public class MpxFileUnitPatch {

	static String apply(String filePath) throws java.io.IOException, java.io.FileNotFoundException {
        File fileToBeModified = new File(filePath);

        File tempFile = File.createTempFile("mpx-patched-", ".tmp");

        tempFile.deleteOnExit();

        Files.copy(fileToBeModified.toPath(), tempFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

        String oldContent = "";

        BufferedReader reader = null;

        FileWriter writer = null;

        try {
            reader = new BufferedReader(new FileReader(tempFile));

            String line = reader.readLine();

            while (line != null) {
                oldContent = oldContent + line + "\r\n";

                line = reader.readLine();
            }

            // replace "wk" units with "w"
            String newContent = oldContent.replaceAll(",([0-9]+\\s?)wk([,$])", ",$1w$2");

            writer = new FileWriter(tempFile);

            writer.write(newContent);
        }
        finally
        {
            reader.close();
            writer.close();
        }

        return tempFile.getAbsolutePath();
    }
}
