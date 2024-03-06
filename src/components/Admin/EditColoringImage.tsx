import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Global/Dialog.tsx';
import React, { useCallback } from 'react';
import type { ColoringImage } from '../../api/admin.ts';
import {
  useYupSchema,
  Yup,
  yupFormResolver,
  type YupResolverType,
} from '../../lib/yup.ts';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { httpPost } from '../../lib/http.ts';
import { toast } from 'sonner';

export type EditColoringImageProps = {
  coloringPage: ColoringImage;
};

export function EditColoringImage(props: EditColoringImageProps) {
  const [loading, setLoading] = React.useState(false);
  const { schema } = useYupSchema({
    prompt: Yup.string().required().label('Prompt'),
    title: Yup.string().optional().label('Title'),
    tags: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        }),
      )
      .optional()
      .label('Tags'),
    isPublic: Yup.boolean().optional().label('Is public'),
  });

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupFormResolver(schema) as YupResolverType<{
      prompt: string;
      title: string;
      tags: Array<{ value: string; label: string }>;
      isPublic: boolean;
    }>,
    defaultValues: {
      prompt: props?.coloringPage?.prompt,
      title: props?.coloringPage?.title,
      tags:
        props?.coloringPage?.tags?.map((tag) => ({ value: tag, label: tag })) ||
        [],
      isPublic: props?.coloringPage?.isPublic ?? false,
    },
  });

  const onSubmit = useCallback(
    handleSubmit(
      async ({
        title,
        tags,
        isPublic,
      }: {
        title: string;
        tags: Array<{ value: string; label: string }>;
        isPublic: boolean;
      }) => {
        setLoading(true);
        const { error } = await httpPost<{
          _id: string;
          status: string;
        }>(`${import.meta.env.PUBLIC_API_URL}/admin/v1-update-coloring-sheet`, {
          id: props.coloringPage._id,
          title,
          tags: tags.map((tag) => tag.value),
          isPublic: isPublic ?? false,
        });

        if (error) {
          setLoading(false);
          toast.error(
            error?.message || 'Something went wrong. Please try again later',
          );
          return;
        }

        setLoading(false);
        toast.success('Coloring sheet updated successfully');

        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
    ),
    [],
  );

  const resetForm = () => {
    reset({ prompt: '', title: '', tags: [], isPublic: false });
  };

  return (
    <Dialog
      onOpenChange={(state) => {
        if (state) {
          // Reset form with new initial values when the dialog opens
          reset({
            prompt: props?.coloringPage?.prompt,
            title: props?.coloringPage?.title,
            tags:
              props?.coloringPage?.tags?.map((tag) => ({
                value: tag,
                label: tag,
              })) || [],
            isPublic: props?.coloringPage?.isPublic ?? false,
          });
        } else {
          // Reset form to some default state when the dialog closes, if needed
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="group rounded-full bg-[#fff2df] p-2">
          <svg
            className="h-5 w-5 stroke-black group-hover:stroke-[#6A7DF6]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent
        allowClose={false}
        className="h-full overflow-y-scroll sm:max-w-[490px] md:h-auto md:overflow-x-auto md:overflow-y-auto"
      >
        <div className="p-8">
          <DialogHeader className="flex flex-row justify-between text-center">
            <DialogTitle className="font-sansita text-4xl font-bold">
              Edit Coloring Page
            </DialogTitle>
            <DialogClose>
              <img
                src="/icon-close-black.png"
                alt="icon-close"
                className="h-[24px] w-[24px]"
              />
            </DialogClose>
          </DialogHeader>
          <DialogDescription className="mt-4">
            Enter details of the coloring page you want to edit.
          </DialogDescription>
          <form
            className="my-3 flex w-full flex-col gap-y-1"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-y-1">
              <input
                type="text"
                disabled={true}
                readOnly={true}
                placeholder="Prompt"
                {...register('prompt')}
                className={`mt-2 block w-full rounded-md border px-3 py-2 text-black placeholder-[#999999] outline-none ${errors?.prompt?.message ? 'border-red-700' : 'border-[#999999]'} focus:border-[#000000] focus:text-black focus:placeholder-black disabled:text-slate-400`}
              />
              {errors?.prompt?.message && (
                <p className="text-xs text-red-700">
                  {errors?.prompt?.message.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <input
                type="text"
                placeholder="Title (optional)"
                {...register('title')}
                className={`mt-2 block w-full rounded-md border px-3 py-2 text-black placeholder-[#999999] outline-none ${errors?.title?.message ? 'border-red-700' : 'border-[#999999]'} focus:border-[#000000] focus:text-black focus:placeholder-black`}
              />
              {errors?.title?.message && (
                <p className="text-xs text-red-700">
                  {errors?.title?.message.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    onChange={(newValue) => field.onChange(newValue)}
                    onCreateOption={(inputValue) => {
                      const newOption = {
                        label: inputValue,
                        value: inputValue,
                      };
                      field.onChange([...field.value, newOption]);
                    }}
                    options={field.value}
                    value={field.value}
                    placeholder="Tags (optional)"
                    // menuPortalTarget={document?.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      control: (provided, state) => ({
                        ...provided,
                        marginTop: '0.5rem', // mt-2
                        width: '100%', // w-full
                        borderRadius: '0.375rem', // rounded-md
                        borderWidth: '1px', // border
                        padding: '0.5rem 0rem', // px-3 py-2
                        outline: 'none',
                        borderColor: state.isFocused ? '#000000' : '#999999',
                        '&:hover': {
                          borderColor: '#000000',
                        },
                        boxShadow: 'none',
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: '#999999',
                      }),
                    }}
                  />
                )}
              />
              {errors?.tags?.message && (
                <p className="text-xs text-red-700">
                  {errors?.tags?.message.toString()}
                </p>
              )}
            </div>
            <div className="mt-1.5 flex items-center gap-y-1">
              <input
                id="isPublic"
                type="checkbox"
                {...register('isPublic')}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isPublic" className="text-md ms-2 select-none">
                Make this coloring page public
              </label>
              {errors?.isPublic?.message && (
                <p className="text-xs text-red-700">
                  {errors?.isPublic?.message.toString()}
                </p>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="mt-5 rounded-md border bg-[#F28637] px-7 py-2.5 text-center font-sansita text-xl font-bold text-white disabled:opacity-30"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
