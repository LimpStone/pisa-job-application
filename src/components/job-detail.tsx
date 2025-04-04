import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type JobDetailProps = {
  title: string;
  location: string;
  department: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
};

const JobDetail: React.FC<JobDetailProps> = ({
  title,
  location,
  department,
  description,
  requirements,
  responsibilities,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{department}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Job Description</h3>
              <p className="text-gray-700 mt-2">{description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Responsibilities</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {responsibilities.map((responsibility) => (
                  <li key={responsibility} className="text-gray-700">{responsibility}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Requirements</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {requirements.map((requirement) => (
                  <li key={requirement} className="text-gray-700">{requirement}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetail;
