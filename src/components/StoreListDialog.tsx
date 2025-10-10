import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Store {
  id: string;
  city: string;
  locality: string;
}

interface StoreListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  versionName: string;
  stores: Store[];
}

export const StoreListDialog = ({ isOpen, onClose, versionName, stores }: StoreListDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = stores.filter(store => {
    const searchLower = searchQuery.toLowerCase();
    return (
      store.id.toLowerCase().includes(searchLower) ||
      store.city.toLowerCase().includes(searchLower) ||
      store.locality.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Store className="w-5 h-5" />
            Stores for {versionName}
          </DialogTitle>
          <DialogDescription>
            Total {stores.length} stores using this version
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by Store ID, City, or Locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {filteredStores.length} of {stores.length} stores
            </span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                <Search className="w-3 h-3" />
                Filtered
              </Badge>
            )}
          </div>

          {/* Store List */}
          <ScrollArea className="h-[400px] rounded-md border">
            <div className="p-4 space-y-2">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Store className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {store.id}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {store.city} {store.locality}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No stores found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
