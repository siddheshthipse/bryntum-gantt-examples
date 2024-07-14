package bryntum.gantt.projectreader;

import net.sf.mpxj.ProjectFile;

public interface JSONBuilder<T> {

    public T buildJSON(ProjectFile projectFile);

}
