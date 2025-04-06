
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Event } from "@/types";
import EventForm from "./EventForm";

interface CreateEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: Omit<Event, "id">) => void;
  isSubmitting?: boolean;
}

const CreateEventDialog = ({
  isOpen,
  onClose,
  onCreateEvent,
  isSubmitting = false,
}: CreateEventDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <EventForm
          onSubmit={onCreateEvent}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
