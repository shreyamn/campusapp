
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocationType } from "@/types";

interface MapSearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: "all" | LocationType;
  setFilterType: (type: "all" | LocationType) => void;
}

const MapSearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
}: MapSearchAndFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search locations..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs 
        value={filterType} 
        onValueChange={(v) => setFilterType(v as "all" | LocationType)} 
        className="flex-shrink-0"
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="building">Buildings</TabsTrigger>
          <TabsTrigger value="lab">Labs</TabsTrigger>
          <TabsTrigger value="department">Departments</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MapSearchAndFilter;
