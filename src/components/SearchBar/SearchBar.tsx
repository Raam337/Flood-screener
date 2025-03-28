import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Field, Box } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  Item,
} from "@choc-ui/chakra-autocomplete";
import floodApi from "@/services/api";

function SearchBar({ children }: { children?: ReactElement }) {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: catchments,
  } = useQuery({
    queryKey: ["catchments"],
    queryFn: floodApi.getAllCatchments,
    refetchOnWindowFocus: false,
  });

  type onSelectOptionType = {
    item: Item;
    selectMethod: "mouse" | "keyboard" | null;
    isNewInput?: boolean;
  };

  const handleSelect = (e: onSelectOptionType) => {
    navigate(`/${e.item.value}`);
  };

  if (error) return <Box>Error: {error.message}</Box>;

  return (
    <Flex justify="center" my="2" align="center" w="full" as="search">
      <Field.Root w="60">
        <Field.Label>Select region:</Field.Label>
        <AutoComplete
          openOnFocus
          isLoading={isLoading}
          onSelectOption={handleSelect}
        >
          <AutoCompleteInput
            variant="subtle"
            autoComplete="off"
            placeholder="Select region..."
          />
          <AutoCompleteList>
            {catchments?.map((item, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={item}
                textTransform="capitalize"
              >
                {item}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </Field.Root>
      {children}
    </Flex>
  );
}

export default SearchBar;
