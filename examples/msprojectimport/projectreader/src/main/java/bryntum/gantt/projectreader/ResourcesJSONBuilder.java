package bryntum.gantt.projectreader;

import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONObject;

import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.Resource;

/**
 * Class implementing extraction a MS Project file resource data
 * into a JSONArray.
*/
public class ResourcesJSONBuilder implements JSONBuilder<JSONArray> {

    Properties properties;

    // field names
    String idField;
    String nameField;
    String calendarIdField;

    public ResourcesJSONBuilder(Properties properties) {
        this.properties = properties;

        // load field names from properties
        loadProperties(properties);
    }

    public void loadProperties(Properties properties) {
        idField = properties.getProperty("resource.UNIQUE_ID");
        nameField = properties.getProperty("resource.NAME");
        calendarIdField = properties.getProperty("resource.BASE_CALENDAR");
    }

    /**
     * Extracts the provided resource data into a JSONObject.
     *
     * @param resource Resource to extract
     * @return JSON object keeping the extracted resource data
     */
    public JSONObject getResourceJSON(Resource resource) {
        JSONObject result = new JSONObject();

        result.put(idField, resource.getUniqueID());
        result.put(nameField, (resource.getName() != null ? resource.getName() : "New resource"));
        result.put(calendarIdField, resource.getBaseCalendar());

        return result;
    }

    public JSONArray buildJSON(ProjectFile projectFile) {
        JSONArray result = new JSONArray();

        // extract all the resources
        for (Resource resource : projectFile.getResources()) {
            result.put(getResourceJSON(resource));
        }

        return result;
    }
}
