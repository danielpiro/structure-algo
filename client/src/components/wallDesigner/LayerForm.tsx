import React, { useCallback, useMemo, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  DragIndicator,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useDrag, useDrop } from "react-dnd";
import { LayerType } from "../../types";
import {
  getItem,
  manufacturers,
  materials,
  products,
} from "../../data/Materials";
import useTranslations from "../../hooks/useTranslations";
import ColorSelector from "../../ui/ColorSelector";

interface LayerFormProps {
  layer: LayerType;
  index: number;
  onChange: (
    id: string,
    field: keyof LayerType,
    value: string | number
  ) => void;
  onRemove: (id: string) => void;
  moveLayer: (dragIndex: number, hoverIndex: number) => void;
  isSelected: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const LayerForm: React.FC<LayerFormProps> = ({
  layer,
  index,
  onChange,
  onRemove,
  moveLayer,
  isSelected,
}) => {
  const { t } = useTranslations();
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "LAYER",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DragItem>({
    accept: "LAYER",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveLayer(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleTypeChange = useCallback(
    (value: string | null) => {
      const newType = value || "";
      onChange(layer.id, "material", newType);
      onChange(layer.id, "manufacturer", "");
      onChange(layer.id, "product", "");
    },
    [layer.id, onChange]
  );

  const handleManufacturerChange = useCallback(
    (value: string | null) => {
      const newManufacturer = value || "";
      onChange(layer.id, "manufacturer", newManufacturer);
      onChange(layer.id, "product", "");
    },
    [layer.id, onChange]
  );

  const handleProductChange = useCallback(
    (value: string | null) => {
      const newProduct = value || "";
      onChange(layer.id, "product", newProduct);
    },
    [layer.id, onChange]
  );

  const handleThicknessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        return;
      }

      const value = Number(e.target.value);
      if (isNaN(value)) {
        setError(t("Invalid thickness"));
        return;
      }

      setError(null);
      onChange(layer.id, "thickness", value);
    },
    [layer.id, onChange, t]
  );

  const handleThicknessBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (value < layer.min) {
        onChange(layer.id, "thickness", layer.min);
      } else if (value > layer.max) {
        onChange(layer.id, "thickness", layer.max);
      }
    },
    [layer.id, layer.min, layer.max, onChange]
  );

  const materialOptions = useMemo(
    () => materials.map((value) => ({ value, label: value })),
    []
  );

  const manufacturerOptions = useMemo(
    () =>
      manufacturers(layer.material).map((value) => ({ value, label: value })),
    [layer.material]
  );

  const productOptions = useMemo(
    () =>
      products(layer.material, layer.manufacturer).map((value) => ({
        value,
        label: value,
      })),
    [layer.material, layer.manufacturer]
  );

  useEffect(() => {
    if (layer.product && layer.material && layer.manufacturer) {
      const newItem = getItem(
        layer.material,
        layer.manufacturer,
        layer.product
      );
      if (newItem) {
        onChange(layer.id, "min", newItem.min);
        onChange(layer.id, "max", newItem.max);
        onChange(layer.id, "thickness", newItem.min);
      }
    }
  }, [layer.manufacturer, layer.material, layer.product, layer.id, onChange]);

  return (
    <Card
      ref={preview}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        transition: "all 0.3s ease",
        boxShadow: isSelected ? "0 0 0 2px #3D8D7A" : "none",
      }}
      onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()} // Prevent card clicks from bubbling up
    >
      <CardHeader
        avatar={
          <Box
            ref={ref}
            sx={{ cursor: "move", display: "flex", alignItems: "center" }}
          >
            <DragIndicator />
          </Box>
        }
        action={
          <>
            <ColorSelector
              color={layer.color || "#FFFFFF"}
              onChange={(color: string) => onChange(layer.id, "color", color)}
            />
            <IconButton
              aria-label="delete"
              onClick={() => onRemove(layer.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={handleToggleExpand}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </>
        }
        title={
          <Typography variant="h6">
            {layer.material || t("Not selected")}
          </Typography>
        }
        sx={{ paddingY: 1 }}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={materialOptions}
                getOptionLabel={(option) => option.label}
                value={
                  layer.material
                    ? { value: layer.material, label: layer.material }
                    : null
                }
                onChange={(_, newValue) =>
                  handleTypeChange(newValue?.value || null)
                }
                renderInput={(params) => (
                  <TextField {...params} label={t("Material")} fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={manufacturerOptions}
                getOptionLabel={(option) => option.label}
                value={
                  layer.manufacturer
                    ? { value: layer.manufacturer, label: layer.manufacturer }
                    : null
                }
                onChange={(_, newValue) =>
                  handleManufacturerChange(newValue?.value || null)
                }
                disabled={!layer.material}
                renderInput={(params) => (
                  <TextField {...params} label={t("Manufacturer")} fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                options={productOptions}
                getOptionLabel={(option) => option.label}
                value={
                  layer.product
                    ? { value: layer.product, label: layer.product }
                    : null
                }
                onChange={(_, newValue) =>
                  handleProductChange(newValue?.value || null)
                }
                disabled={!layer.material || !layer.manufacturer}
                renderInput={(params) => (
                  <TextField {...params} label={t("Product")} fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(error)}>
                <InputLabel htmlFor={`thickness-${layer.id}`}>
                  {t("Thickness")} ({t("cm")})
                </InputLabel>
                <OutlinedInput
                  id={`thickness-${layer.id}`}
                  value={layer.thickness || ""}
                  onChange={handleThicknessChange}
                  onBlur={handleThicknessBlur}
                  endAdornment={
                    <InputAdornment position="end">{t("cm")}</InputAdornment>
                  }
                  label={`${t("Thickness")} (${t("cm")})`}
                  type="number"
                  inputProps={{
                    min: layer.min,
                    max: layer.max,
                    step: 0.1,
                  }}
                  disabled={!layer.product || layer.min === layer.max}
                />
                <FormHelperText>
                  {error
                    ? error
                    : layer.min === layer.max
                    ? `${t("Fixed thickness")}: ${layer.min} ${t("cm")}`
                    : `${t("Range")}: ${layer.min}-${layer.max} ${t("cm")}`}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default LayerForm;
