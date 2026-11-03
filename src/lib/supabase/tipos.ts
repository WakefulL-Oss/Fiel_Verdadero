export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      etiquetas: {
        Row: {
          id: number
          nombre: string
          slug: string
        }
        Insert: {
          id?: number
          nombre: string
          slug: string
        }
        Update: {
          id?: number
          nombre?: string
          slug?: string
        }
        Relationships: []
      }
      perfiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          creado_en: string
          id: string
          iglesia: string | null
          nombre_completo: string
          rol: Database["public"]["Enums"]["rol_usuario"]
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          creado_en?: string
          id: string
          iglesia?: string | null
          nombre_completo: string
          rol?: Database["public"]["Enums"]["rol_usuario"]
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          creado_en?: string
          id?: string
          iglesia?: string | null
          nombre_completo?: string
          rol?: Database["public"]["Enums"]["rol_usuario"]
          username?: string | null
        }
        Relationships: []
      }
      reportes: {
        Row: {
          creado_en: string
          estado: Database["public"]["Enums"]["reporte_estado"]
          id: number
          motivo: string
          reportante: string | null
          sermon_id: string
        }
        Insert: {
          creado_en?: string
          estado?: Database["public"]["Enums"]["reporte_estado"]
          id?: never
          motivo: string
          reportante?: string | null
          sermon_id: string
        }
        Update: {
          creado_en?: string
          estado?: Database["public"]["Enums"]["reporte_estado"]
          id?: never
          motivo?: string
          reportante?: string | null
          sermon_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reportes_reportante_fkey"
            columns: ["reportante"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reportes_sermon_id_fkey"
            columns: ["sermon_id"]
            isOneToOne: false
            referencedRelation: "sermones"
            referencedColumns: ["id"]
          },
        ]
      }
      series: {
        Row: {
          autor_id: string
          creado_en: string
          descripcion: string | null
          id: string
          titulo: string
        }
        Insert: {
          autor_id: string
          creado_en?: string
          descripcion?: string | null
          id?: string
          titulo: string
        }
        Update: {
          autor_id?: string
          creado_en?: string
          descripcion?: string | null
          id?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "series_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sermon_citas: {
        Row: {
          capitulo: number
          id: number
          libro: number
          sermon_id: string
          vers_fin: number | null
          vers_ini: number | null
        }
        Insert: {
          capitulo: number
          id?: never
          libro: number
          sermon_id: string
          vers_fin?: number | null
          vers_ini?: number | null
        }
        Update: {
          capitulo?: number
          id?: never
          libro?: number
          sermon_id?: string
          vers_fin?: number | null
          vers_ini?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sermon_citas_sermon_id_fkey"
            columns: ["sermon_id"]
            isOneToOne: false
            referencedRelation: "sermones"
            referencedColumns: ["id"]
          },
        ]
      }
      sermon_etiquetas: {
        Row: {
          etiqueta_id: number
          sermon_id: string
        }
        Insert: {
          etiqueta_id: number
          sermon_id: string
        }
        Update: {
          etiqueta_id?: number
          sermon_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sermon_etiquetas_etiqueta_id_fkey"
            columns: ["etiqueta_id"]
            isOneToOne: false
            referencedRelation: "etiquetas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sermon_etiquetas_sermon_id_fkey"
            columns: ["sermon_id"]
            isOneToOne: false
            referencedRelation: "sermones"
            referencedColumns: ["id"]
          },
        ]
      }
      sermon_notas: {
        Row: {
          actualizado_en: string
          notas: string
          sermon_id: string
        }
        Insert: {
          actualizado_en?: string
          notas?: string
          sermon_id: string
        }
        Update: {
          actualizado_en?: string
          notas?: string
          sermon_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sermon_notas_sermon_id_fkey"
            columns: ["sermon_id"]
            isOneToOne: true
            referencedRelation: "sermones"
            referencedColumns: ["id"]
          },
        ]
      }
      sermon_vistas: {
        Row: {
          dia: string
          perfil_id: string
          sermon_id: string
        }
        Insert: {
          dia?: string
          perfil_id: string
          sermon_id: string
        }
        Update: {
          dia?: string
          perfil_id?: string
          sermon_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sermon_vistas_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sermon_vistas_sermon_id_fkey"
            columns: ["sermon_id"]
            isOneToOne: false
            referencedRelation: "sermones"
            referencedColumns: ["id"]
          },
        ]
      }
      sermones: {
        Row: {
          actualizado_en: string
          autor_id: string
          busqueda: unknown
          contenido: Json
          creado_en: string
          estado: Database["public"]["Enums"]["sermon_estado"]
          id: string
          pasaje_texto: string | null
          portada_url: string | null
          publicado_en: string | null
          resumen: string | null
          serie_id: string | null
          slug: string
          titulo: string
          vistas: number
        }
        Insert: {
          actualizado_en?: string
          autor_id: string
          busqueda?: unknown
          contenido?: Json
          creado_en?: string
          estado?: Database["public"]["Enums"]["sermon_estado"]
          id?: string
          pasaje_texto?: string | null
          portada_url?: string | null
          publicado_en?: string | null
          resumen?: string | null
          serie_id?: string | null
          slug: string
          titulo: string
          vistas?: number
        }
        Update: {
          actualizado_en?: string
          autor_id?: string
          busqueda?: unknown
          contenido?: Json
          creado_en?: string
          estado?: Database["public"]["Enums"]["sermon_estado"]
          id?: string
          pasaje_texto?: string | null
          portada_url?: string | null
          publicado_en?: string | null
          resumen?: string | null
          serie_id?: string | null
          slug?: string
          titulo?: string
          vistas?: number
        }
        Relationships: [
          {
            foreignKeyName: "sermones_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sermones_serie_id_fkey"
            columns: ["serie_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      buscar_sermones: {
        Args: { p_limit?: number; p_offset?: number; q: string }
        Returns: {
          actualizado_en: string
          autor_id: string
          busqueda: unknown
          contenido: Json
          creado_en: string
          estado: Database["public"]["Enums"]["sermon_estado"]
          id: string
          pasaje_texto: string | null
          portada_url: string | null
          publicado_en: string | null
          resumen: string | null
          serie_id: string | null
          slug: string
          titulo: string
          vistas: number
        }[]
        SetofOptions: {
          from: "*"
          to: "sermones"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      es_moderador: { Args: never; Returns: boolean }
      es_url_https: { Args: { url: string }; Returns: boolean }
      incrementar_vistas: { Args: { p_slug: string }; Returns: undefined }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      unaccent: { Args: { "": string }; Returns: string }
    }
    Enums: {
      reporte_estado: "pendiente" | "revisado" | "descartado"
      rol_usuario: "usuario" | "moderador" | "admin"
      sermon_estado: "borrador" | "publicado" | "oculto"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      reporte_estado: ["pendiente", "revisado", "descartado"],
      rol_usuario: ["usuario", "moderador", "admin"],
      sermon_estado: ["borrador", "publicado", "oculto"],
    },
  },
} as const
