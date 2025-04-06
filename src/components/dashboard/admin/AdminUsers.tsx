
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useUserManagement } from "@/hooks/useUserManagement";
import UserList from "./UserList";
import UserForm from "./UserForm";

interface AdminUsersProps {
  onBack: () => void;
}

const AdminUsers = ({ onBack }: AdminUsersProps) => {
  const {
    users,
    editingUser,
    generateEmail,
    handleEdit,
    handleDelete,
    handleSaveUser,
    cancelEdit
  } = useUserManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Button>
        <h1 className="text-2xl font-bold">Manage Users</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">User List</h2>
          <UserList 
            users={users} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h2>
          <UserForm 
            editingUser={editingUser}
            onSubmit={(data) => {
              handleSaveUser(data, editingUser?.id);
            }}
            onCancel={cancelEdit}
            generateEmail={generateEmail}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
