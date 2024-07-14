package bryntum.gantt.projectreader;

import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONObject;

import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.Resource;
import net.sf.mpxj.ResourceAssignment;

/**
 * Class implementing extraction a MS Project file assignments data
 * into a JSONArray.
 */
public class AssignmentsJSONBuilder implements JSONBuilder<JSONArray> {

    Properties properties;

    // field names
    String idField;
    String resourceIdField;
    String taskIdField;
    String unitsField;

    public AssignmentsJSONBuilder(Properties properties) {
        this.properties = properties;

        // load field names from properties
        loadProperties(properties);
    }

    public void loadProperties(Properties properties) {
        idField = properties.getProperty("assignment.UNIQUE_ID");
        resourceIdField = properties.getProperty("assignment.RESOURCE_UNIQUE_ID");
        taskIdField = properties.getProperty("assignment.TASK_UNIQUE_ID");
        unitsField = properties.getProperty("assignment.UNITS");
    }

    /**
     * Extracts the provided assignment data into JSON object.
     *
     * @param assignment Assignment to extract
     * @return JSON object keeping the extracted assignment data
     */
    public JSONObject getAssignmentJSON(ResourceAssignment assignment) {
        JSONObject result = new JSONObject();

        result.put(idField, assignment.getUniqueID());
        result.put(resourceIdField, assignment.getResourceUniqueID());
        result.put(taskIdField, assignment.getTaskUniqueID());
        result.put(unitsField, assignment.getUnits());

        return result;
    }

    public JSONArray buildJSON(ProjectFile projectFile) {
        JSONArray result = new JSONArray();

        // extract all the resources
        for (Resource resource : projectFile.getResources()) {
            // corresponding resource' assignment
            for (ResourceAssignment assignment : resource.getTaskAssignments()) {
                result.put(getAssignmentJSON(assignment));
            }
        }

        return result;
    }
}
