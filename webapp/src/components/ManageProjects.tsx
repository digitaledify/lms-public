import { useMatch } from "@tanstack/react-location";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../lib/http-client";
import { Course } from "../types/courses";
import DownloadFile from "./DownloadFile";

type ManageProjectsProps = {
  course: Course;
};

function ManageProjects(props: ManageProjectsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const match = useMatch();
  const queryClient = useQueryClient();

  const invalidateCourseData = () => {
    // Invalidate course data
    queryClient.invalidateQueries(["getCourse", match.params.courseId]);
  };

  const deleteMutation = useMutation({
    mutationKey: ["delete-project", props.course.id],
    mutationFn: async (projectFile: string) => {
      const { data } = await axiosInstance.delete(
        `/courses/${props.course.id}/projects?projectFile=${projectFile}`
      );
      return data;
    },
    onSuccess: (data) => {
      invalidateCourseData();
      toast(`Project deleted successfully`, {
        type: "success",
      });
    },
  });

  const handleDeleteProject = (projectFile: string) => {
    deleteMutation.reset();
    deleteMutation.mutate(projectFile);
  };

  const addProjectMutation = useMutation({
    mutationKey: ["add-project", props.course.id],
    mutationFn: async (data: FormData) => {
      const res = await axiosInstance.post(
        `/courses/${props.course.id}/projects`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      invalidateCourseData();
      toast(`Project added successfully`, {
        type: "success",
      });
    },
  });

  const handleAddProject = () => {
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("projectFile", file);
      addProjectMutation.reset();
      addProjectMutation.mutate(formData);

      // Reset file input
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {props.course.projectFiles.length > 0 ? (
        <table className="table-zebra table border">
          <thead>
            <tr>
              <th className="rounded-none capitalize">Project</th>
              <th className="rounded-none capitalize">Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.course.projectFiles.map((projectFile) => (
              <tr key={projectFile}>
                <td>
                  <DownloadFile
                    azureFileUrl={projectFile}
                    className="link link-primary"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-error btn-square btn-sm"
                    onClick={() => handleDeleteProject(projectFile)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info rounded-none shadow-lg">
          <div>
            <FaInfoCircle />
            <span>
              No projects found. You can add projects by uploading them using
              the form below.
            </span>
          </div>
        </div>
      )}

      <div className="mt-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload New Project</span>
          </label>
          <input
            type="file"
            ref={fileInputRef}
            className="file-input file-input-bordered file-input-info max-w-md rounded-none capitalize"
          />

          <div className="mt-4">
            <button
              onClick={() => handleAddProject()}
              disabled={addProjectMutation.isLoading}
              type="submit"
              className={clsx("btn btn-primary capitalize", {
                loading: addProjectMutation.isLoading,
              })}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProjects;
