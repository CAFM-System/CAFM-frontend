import { Circle } from "lucide-react";

const StatusHistory = ({ data }) => {
    const getStatusColor = (status) => {
        const colors = {
            open: 'bg-blue-100 text-blue-700',
            assigned: 'bg-purple-100 text-purple-700',
            in_progress: 'bg-yellow-100 text-yellow-700',
            resolved: 'bg-green-100 text-green-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getStatusDotColor = (status) => {
        const colors = {
            open: 'text-blue-500',
            assigned: 'text-purple-500',
            in_progress: 'text-yellow-500',
            resolved: 'text-green-500'
        };
        return colors[status] || 'text-gray-400';
    };

    const getProgressString = (string) => {
        string = string.split('_');
        let newString = "";
        string.map((word, index) => {
            newString += word.substring(0, 1).toUpperCase() + word.substring(1) + ' ';
        })

        return newString;
    }

    return (
        <>
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <Circle size={16} strokeWidth={5} className={getStatusDotColor(item.status)} />
                            {index < data.length - 1 && (
                                <div className="w-0-5 h-full bg-gray-200 mt-1"></div>
                            )}
                        </div>
                        <div className="flex-1 pb-6">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-1 text-xs rounded ${getStatusColor(item.status)}`}>
                                    {getProgressString(item.status)}
                                </span>
                                <span className="text-sm text-gray-500">{item.timestamp}</span>
                            </div>
                            <p className="text-gray-900 mb-1">{item.message}</p>
                            <p className="text-sm text-gray-500">by {item.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default StatusHistory;